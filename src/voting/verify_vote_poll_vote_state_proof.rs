use crate::utils::getters::VecU8ToUint8Array;
use dpp::data_contract::accessors::v0::DataContractV0Getters;
use dpp::data_contract::DataContract;
use dpp::identifier::Identifier;
use dpp::platform_value::Value;
use dpp::serialization::PlatformDeserializableWithPotentialValidationFromVersionedStructure;
use dpp::version::PlatformVersion;
use dpp::voting::vote_polls::contested_document_resource_vote_poll::ContestedDocumentResourceVotePoll;
use drive::query::vote_poll_vote_state_query::{
    ContestedDocumentVotePollDriveQuery, ContestedDocumentVotePollDriveQueryResultType,
};
use js_sys::{Array, Function, Object, Reflect, Uint8Array};
use std::sync::Arc;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct VerifyVotePollVoteStateProofResult {
    root_hash: Vec<u8>,
    result: JsValue,
}

#[wasm_bindgen]
impl VerifyVotePollVoteStateProofResult {
    #[wasm_bindgen(getter)]
    pub fn root_hash(&self) -> Uint8Array {
        self.root_hash.to_uint8array()
    }

    #[wasm_bindgen(getter)]
    pub fn result(&self) -> JsValue {
        self.result.clone()
    }
}

pub fn stringify(data: &JsValue) -> Result<String, JsValue> {
    let replacer_func = Function::new_with_args(
        "key, value",
        "return (value != undefined && value.type=='Buffer')  ? value.data : value ",
    );

    let data_string: String =
        js_sys::JSON::stringify_with_replacer(data, &JsValue::from(replacer_func))?.into();

    Ok(data_string)
}

#[wasm_bindgen(js_name = "verifyVotePollVoteStateProof")]
pub fn verify_vote_poll_vote_state_proof(
    proof: &Uint8Array,
    contract_cbor: &Uint8Array,
    document_type_name: &str,
    index_name: &str,
    js_index_values: Vec<Uint8Array>,
    result_type: i32, // "documents" or "values"
    allow_include_locked_and_abstaining_vote_tally: bool,
    count: Option<u16>,
    js_start_at: &JsValue,
    platform_version_number: u32,
) -> Result<VerifyVotePollVoteStateProofResult, JsValue> {
    let proof_vec = proof.to_vec();

    let index_values: Vec<Value> = js_index_values
        .iter()
        .map(|js_index_value| {
            let js_index_value_bytes = js_index_value.to_vec();

            let value_type = js_index_value_bytes.get(0).unwrap();
            let _value_len = js_index_value_bytes.get(0).unwrap();

            if *value_type != 0x12 {
                return Err(JsValue::from("can be used only string type (0x12)"))
            }

            let (_,value_bytes) = js_index_value_bytes.split_at(3);

            let value = core::str::from_utf8(value_bytes).unwrap();

            Ok(Value::Text(value.to_string())) 
        })
        .collect::<Result<Vec<Value>, JsValue>>()?;

    // Deserialize the data contract
    let contract_bytes = contract_cbor.to_vec();
    let platform_version = PlatformVersion::get(platform_version_number)
        .map_err(|e| JsValue::from_str(&format!("Invalid platform version: {:?}", e)))?;

    let contract = DataContract::versioned_deserialize(&contract_bytes, true, platform_version)
        .map_err(|e| JsValue::from_str(&format!("Failed to deserialize contract: {:?}", e)))?;
    let contract_arc = Arc::new(contract);

    let start_at = match js_start_at.is_object() {
        false => None,
        true => {
            let start_identifier = Uint8Array::from(Reflect::get(&js_start_at, &JsValue::from_str("startIdentifier"))?);
            let start_identifier_included = Reflect::get(&js_start_at, &JsValue::from_str("startIdentifierIncluded"))?.as_bool().unwrap();

            Some((Identifier::from_vec(start_identifier.to_vec()).unwrap().to_buffer(), start_identifier_included))
        }
    };

    // Create the query
    let query = ContestedDocumentVotePollDriveQuery {
        vote_poll: ContestedDocumentResourceVotePoll {
            contract_id: contract_arc.id(),
            document_type_name: document_type_name.to_string(),
            index_name: index_name.to_string(),
            index_values,
        },
        result_type: ContestedDocumentVotePollDriveQueryResultType::try_from(result_type)
            .map_err(|err| JsValue::from_str(&err.to_string()))?,
        offset: None,
        limit: count,
        start_at,
        allow_include_locked_and_abstaining_vote_tally,
    };

    let resolved_query = query
        .resolve_with_provided_borrowed_contract(&contract_arc)
        .map_err(|e| JsValue::from_str(&format!("Failed to resolve query: {:?}", e)))?;

    let (root_hash, execution_result) = resolved_query
        .verify_vote_poll_vote_state_proof(&proof_vec, platform_version)
        .map_err(|e| JsValue::from_str(&format!("Verification failed: {:?}", e)))?;

    // Convert execution result to JS object
    let js_result = {
        let result_obj = Object::new();

        // Add contenders array
        let contenders_array = Array::new();
        for contender in execution_result.contenders {
            let vote_tally = contender.vote_tally();

            let id_bytes = contender
                .identity_id()
                .to_buffer();

            let id_uint8 = Uint8Array::from(&id_bytes[..]);

            let document_bytes = contender
                .serialized_document()
                .clone();

            let contender_object = Object::new();

            Reflect::set(&contender_object, &JsValue::from("identifier"), &id_uint8)?;
            Reflect::set(&contender_object, &JsValue::from("voteCount"), &JsValue::from(vote_tally))?;
            Reflect::set(&contender_object, &JsValue::from("document"), &JsValue::from(document_bytes))?;

            contenders_array.push(&contender_object);
        }
        Reflect::set(
            &result_obj,
            &JsValue::from_str("contenders"),
            &contenders_array,
        )
        .map_err(|_| JsValue::from_str("Failed to set contenders"))?;

        // Add vote tallies if present
        if let Some(abstaining_vote_tally) = execution_result.abstaining_vote_tally {
            Reflect::set(
                &result_obj,
                &JsValue::from_str("abstainVoteTally"),
                &JsValue::from_f64(abstaining_vote_tally as f64),
            )
            .map_err(|_| JsValue::from_str("Failed to set abstainVoteTally"))?;
        }

        if let Some(locked_vote_tally) = execution_result.locked_vote_tally {
            Reflect::set(
                &result_obj,
                &JsValue::from_str("lockedVoteTally"),
                &JsValue::from_f64(locked_vote_tally as f64),
            )
            .map_err(|_| JsValue::from_str("Failed to set lockedVoteTally"))?;
        }

        if let Some((winner_info, block_info)) = execution_result.winner {
            let winner_obj = Object::new();

            // Serialize ContestedDocumentVotePollWinnerInfo
            match winner_info {
                dpp::voting::vote_info_storage::contested_document_vote_poll_winner_info::ContestedDocumentVotePollWinnerInfo::NoWinner => {
                    Reflect::set(&winner_obj, &JsValue::from_str("type"), &JsValue::from_str("NoWinner"))
                        .map_err(|_| JsValue::from_str("Failed to set winner type"))?;
                }
                dpp::voting::vote_info_storage::contested_document_vote_poll_winner_info::ContestedDocumentVotePollWinnerInfo::WonByIdentity(identifier) => {
                    Reflect::set(&winner_obj, &JsValue::from_str("type"), &JsValue::from_str("WonByIdentity"))
                        .map_err(|_| JsValue::from_str("Failed to set winner type"))?;
                    let id_array = Uint8Array::from(identifier.as_slice());
                    Reflect::set(&winner_obj, &JsValue::from_str("identityId"), &id_array)
                        .map_err(|_| JsValue::from_str("Failed to set winner identity"))?;
                }
                dpp::voting::vote_info_storage::contested_document_vote_poll_winner_info::ContestedDocumentVotePollWinnerInfo::Locked => {
                    Reflect::set(&winner_obj, &JsValue::from_str("type"), &JsValue::from_str("Locked"))
                        .map_err(|_| JsValue::from_str("Failed to set winner type"))?;
                }
            }

            // Add block info
            let block_info_obj = Object::new();
            Reflect::set(
                &block_info_obj,
                &JsValue::from_str("height"),
                &JsValue::from_f64(block_info.height as f64),
            )
            .map_err(|_| JsValue::from_str("Failed to set block height"))?;
            Reflect::set(
                &block_info_obj,
                &JsValue::from_str("coreHeight"),
                &JsValue::from(block_info.core_height),
            )
            .map_err(|_| JsValue::from_str("Failed to set core height"))?;
            Reflect::set(
                &block_info_obj,
                &JsValue::from_str("timeMs"),
                &JsValue::from_f64(block_info.time_ms as f64),
            )
            .map_err(|_| JsValue::from_str("Failed to set time ms"))?;
            Reflect::set(
                &block_info_obj,
                &JsValue::from_str("epoch"),
                &JsValue::from(block_info.epoch.index),
            )
            .map_err(|_| JsValue::from_str("Failed to set epoch"))?;

            Reflect::set(
                &winner_obj,
                &JsValue::from_str("blockInfo"),
                &block_info_obj,
            )
            .map_err(|_| JsValue::from_str("Failed to set block info"))?;

            Reflect::set(&result_obj, &JsValue::from_str("winner"), &winner_obj)
                .map_err(|_| JsValue::from_str("Failed to set winner"))?;
        }

        Reflect::set(
            &result_obj,
            &JsValue::from_str("skipped"),
            &JsValue::from_f64(execution_result.skipped as f64),
        )
        .map_err(|_| JsValue::from_str("Failed to set skipped"))?;

        result_obj.into()
    };

    Ok(VerifyVotePollVoteStateProofResult {
        root_hash: root_hash.to_vec(),
        result: js_result,
    })
}
