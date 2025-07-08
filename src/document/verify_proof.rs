use crate::utils::bounds::{check_array_bounds, check_object_bounds};
use crate::utils::error::{
    format_error, format_error_with_context, format_result_error, format_result_error_with_context,
    ErrorCategory,
};
use crate::utils::getters::VecU8ToUint8Array;
use crate::utils::platform_version::get_platform_version_with_validation;
use dpp::data_contract::accessors::v0::DataContractV0Getters;
use dpp::data_contract::{DataContract, JsonValue};
use dpp::document::serialization_traits::DocumentPlatformConversionMethodsV0;
use dpp::platform_value::Value;
use dpp::serialization::PlatformDeserializableWithPotentialValidationFromVersionedStructure;
use drive::query::WhereOperator::{
    Between, BetweenExcludeBounds, BetweenExcludeLeft, BetweenExcludeRight, Equal, GreaterThan,
    GreaterThanOrEquals, In, LessThan, LessThanOrEquals, StartsWith,
};
use drive::query::{DriveDocumentQuery, InternalClauses, OrderClause, WhereClause, WhereOperator};
use indexmap::IndexMap;
use js_sys::{Array, Function, Object, Reflect, Uint8Array};
use serde_wasm_bindgen::from_value;
use std::collections::BTreeMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct VerifyDocumentProofResult {
    root_hash: Vec<u8>,
    documents: Array,
}

#[wasm_bindgen]
impl VerifyDocumentProofResult {
    #[wasm_bindgen(getter)]
    pub fn root_hash(&self) -> Uint8Array {
        self.root_hash.to_uint8array()
    }

    #[wasm_bindgen(getter)]
    pub fn documents(&self) -> Array {
        self.documents.clone()
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

#[wasm_bindgen(js_name = "verifyDocumentProof")]
pub fn verify_document_proof(
    proof: &Uint8Array,
    contract_js: &JsValue,
    document_type_name: &str,
    where_clauses: &JsValue,
    order_by: &JsValue,
    limit: Option<u16>,
    start_at: Option<Uint8Array>,
    start_at_included: bool,
    block_time_ms: Option<u64>,
    platform_version_number: u32,
) -> Result<VerifyDocumentProofResult, JsValue> {
    let proof_vec = proof.to_vec();

    let platform_version = get_platform_version_with_validation(platform_version_number)?;

    // For now, we need the contract to be provided as CBOR bytes through contract_js
    // This is a limitation until we have proper JS serialization for DataContract
    let contract_bytes: Vec<u8> = if contract_js.is_instance_of::<Uint8Array>() {
        let array: Uint8Array = contract_js.clone().dyn_into().map_err(|_| {
            format_error(
                ErrorCategory::ConversionError,
                "contract must be Uint8Array",
            )
        })?;
        array.to_vec()
    } else {
        return Err(format_error(
            ErrorCategory::InvalidInput,
            "contract must be provided as Uint8Array (CBOR bytes)",
        ));
    };

    let contract = DataContract::versioned_deserialize(&contract_bytes, true, platform_version)
        .map_err(|e| format_result_error(ErrorCategory::DeserializationError, e))?;

    // Get document type
    let document_type = contract
        .document_type_for_name(document_type_name)
        .map_err(|e| {
            format_result_error_with_context(ErrorCategory::NotFoundError, document_type_name, e)
        })?;



    // Parse where clauses
    let internal_clauses = match where_clauses.is_null() || where_clauses.is_undefined() {
        true => InternalClauses::default(),
        false => parse_query_internal_clause(&where_clauses)?
    };

    // Parse order by
    let mut order_by_map = IndexMap::new();

    if !(order_by.is_undefined() || order_by.is_null()) {
        let js_order_by_array = Array::from(&order_by);

        for js_order_by_value in js_order_by_array.iter() {
            let order_by_array = Array::from(&js_order_by_value);

            let field = order_by_array.get(0).as_string().unwrap();
            let ascending = match order_by_array.get(1).as_string().unwrap().as_str() {
                "desc" => false,
                _ => true,
            };

            let order_clause = OrderClause{ field: field.clone(), ascending };

            order_by_map.insert(field, order_clause);
        }
    }

    // Parse start_at
    let start_at_bytes = start_at.map(|arr| {
        let vec = arr.to_vec();
        let bytes: [u8; 32] = vec
            .try_into()
            .map_err(|_| format_error(ErrorCategory::InvalidInput, "start_at must be 32 bytes"))
            .unwrap();
        bytes
    });

    // Create the query
    let query = DriveDocumentQuery {
        contract: &contract,
        document_type,
        internal_clauses,
        offset: None,
        limit,
        order_by: order_by_map,
        start_at: start_at_bytes,
        start_at_included,
        block_time_ms,
    };

    let (root_hash, documents) = query
        .verify_proof(&proof_vec, platform_version)
        .map_err(|e| format_result_error(ErrorCategory::VerificationError, e))?;

    // Convert documents to JS array
    let js_array = Array::new();
    for doc in documents {
        // Convert document to JS value
        let doc_js = DocumentPlatformConversionMethodsV0::serialize(
            &doc,
            document_type,
            &contract.clone(),
            &platform_version,
        )
        .map_err(|err| JsError::from(err))?;

        js_array.push(&JsValue::from(doc_js));
    }

    Ok(VerifyDocumentProofResult {
        root_hash: root_hash.to_vec(),
        documents: js_array,
    })
}

fn parse_query_internal_clause(where_clauses: &JsValue) -> Result<InternalClauses, JsValue> {
    let query_clauses_array = Array::from(where_clauses);
    let mut query_where_clauses: Vec<WhereClause> = Vec::new();

    for clause in query_clauses_array.iter() {
        let clause_array = Array::from(&clause.clone());

        let js_field = Array::get(&clause_array, 0);
        let js_operator = Array::get(&clause_array, 1);
        let js_value = Array::get(&clause_array, 2);

        let field = js_field.as_string().unwrap();

        let operator = match js_operator.as_string().unwrap().as_str() {
            "=" | "==" => Some(Equal),
            ">" => Some(GreaterThan),
            ">=" => Some(GreaterThanOrEquals),
            "<" => Some(LessThan),
            "<=" => Some(LessThanOrEquals),
            "Between" | "between" => Some(Between),
            "BetweenExcludeBounds"
            | "betweenExcludeBounds"
            | "betweenexcludebounds"
            | "between_exclude_bounds" => Some(BetweenExcludeBounds),
            "BetweenExcludeLeft"
            | "betweenExcludeLeft"
            | "betweenexcludeleft"
            | "between_exclude_left" => Some(BetweenExcludeLeft),
            "BetweenExcludeRight"
            | "betweenExcludeRight"
            | "betweenexcluderight"
            | "between_exclude_right" => Some(BetweenExcludeRight),
            "In" | "in" => Some(In),
            "StartsWith" | "startsWith" | "startswith" | "starts_with" => Some(StartsWith),
            &_ => None,
        }.unwrap();

        let value: Value = serde_json::from_str::<JsonValue>(&stringify(&js_value)?)
            .map_err(|err| JsError::from(err))?
            .into();

        query_where_clauses.push(WhereClause {
            field,
            operator,
            value,
        })
    }

    Ok(InternalClauses::extract_from_clauses(query_where_clauses).map_err(JsError::from)?)
}