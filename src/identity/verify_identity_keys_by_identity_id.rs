use crate::utils::getters::VecU8ToUint8Array;
use dpp::identity::{KeyID, PartialIdentity};
use dpp::serialization::PlatformSerializable;
use dpp::version::PlatformVersion;
use drive::drive::identity::key::fetch::{IdentityKeysRequest, KeyRequestType};
use drive::drive::Drive;
use js_sys::{Array, Uint8Array};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct VerifyIdentityKeysByIdentityIdResult {
    root_hash: Vec<u8>,
    identity: Option<PartialIdentity>,
}

#[wasm_bindgen(js_name = "verifyIdentityKeysByIdentityId")]
pub fn verify_identity_keys_by_identity_id(
    proof: &Uint8Array,
    identity_id: &Uint8Array,
    specific_key_ids: Option<Array>,
    with_revision: bool,
    with_balance: bool,
    is_proof_subset: bool,
    limit: Option<u16>,
    offset: Option<u16>,
    platform_version_number: u32,
) -> Result<VerifyIdentityKeysByIdentityIdResult, JsValue> {
    let proof_vec = proof.to_vec();

    let identity_id_bytes: [u8; 32] = identity_id
        .to_vec()
        .try_into()
        .map_err(|_| JsValue::from_str("Invalid identity_id length. Expected 32 bytes."))?;

    // Create the key request type based on whether specific keys are requested
    let request_type = if let Some(keys_array) = specific_key_ids {
        let mut keys_vec = Vec::new();
        for i in 0..keys_array.length() {
            let key_id = keys_array
                .get(i)
                .as_string()
                .ok_or_else(|| JsValue::from_str("Key ID must be a string"))?
                .parse::<u32>()
                .map_err(|_| JsValue::from_str("Invalid key ID number"))?;
            keys_vec.push(key_id);
        }
        KeyRequestType::SpecificKeys(keys_vec)
    } else {
        KeyRequestType::AllKeys
    };

    let key_request = IdentityKeysRequest {
        identity_id: identity_id_bytes,
        request_type,
        limit,
        offset,
    };

    let platform_version = PlatformVersion::get(platform_version_number)
        .map_err(|e| JsValue::from_str(&format!("Invalid platform version: {:?}", e)))?;

    let (root_hash, identity_option) = Drive::verify_identity_keys_by_identity_id(
        &proof_vec,
        key_request,
        with_revision,
        with_balance,
        is_proof_subset,
        platform_version,
    )
    .map_err(|e| JsValue::from_str(&format!("Verification failed: {:?}", e)))?;

    Ok(VerifyIdentityKeysByIdentityIdResult {
        root_hash: root_hash.to_vec(),
        identity: identity_option,
    })
}

impl VerifyIdentityKeysByIdentityIdResult {
    pub fn new(root_hash: Vec<u8>, partial_identity: Option<PartialIdentity>) -> Self {
        VerifyIdentityKeysByIdentityIdResult {
            root_hash,
            identity: partial_identity,
        }
    }
}

#[wasm_bindgen]
impl VerifyIdentityKeysByIdentityIdResult {
    #[wasm_bindgen(getter)]
    pub fn root_hash(&self) -> Uint8Array {
        self.root_hash.to_uint8array()
    }

    #[wasm_bindgen(getter = "loadedIdentityKeys")]
    pub fn loaded_identity_keys(&self) -> Result<Option<Vec<Uint8Array>>, JsValue> {
        match self.identity.clone() {
            Some(identity) => {
                let mut arr = Vec::new();

                for (_k, v) in identity.loaded_public_keys.iter() {
                    arr.push(Uint8Array::from(
                        v.serialize_to_bytes()
                            .map_err(|err| JsValue::from(err.to_string()))?
                            .as_slice(),
                    ));
                }
                
                Ok(Some(arr))
            }
            None => Ok(None),
        }
    }

    #[wasm_bindgen(getter = "notFoundPublicKeys")]
    pub fn not_found_public_keys(&self) -> Vec<KeyID> {
        match self.identity.clone() {
            None => Vec::new(),
            Some(identity) =>
                identity
                    .not_found_public_keys
                    .iter()
                    .map(|key_id| key_id.clone())
                    .collect(),
        }
    }
}
