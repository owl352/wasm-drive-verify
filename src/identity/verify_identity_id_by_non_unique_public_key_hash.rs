use crate::utils::getters::VecU8ToUint8Array;
use dpp::version::PlatformVersion;
use drive::drive::Drive;
use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct VerifyIdentityIdByNonUniquePublicKeyHashResult {
    root_hash: Vec<u8>,
    identity_id: Option<Vec<u8>>,
}

#[wasm_bindgen]
impl VerifyIdentityIdByNonUniquePublicKeyHashResult {
    #[wasm_bindgen(getter)]
    pub fn root_hash(&self) -> Uint8Array {
        self.root_hash.to_uint8array()
    }

    #[wasm_bindgen(getter)]
    pub fn identity_id(&self) -> Option<Vec<u8>> {
        self.identity_id.clone()
    }
}

#[wasm_bindgen(js_name = "verifyIdentityIdByNonUniquePublicKeyHash")]
pub fn verify_identity_id_by_non_unique_public_key_hash(
    proof: &Uint8Array,
    is_proof_subset: bool,
    public_key_hash: &Uint8Array,
    after: Option<Uint8Array>,
    platform_version_number: u32,
) -> Result<VerifyIdentityIdByNonUniquePublicKeyHashResult, JsValue> {
    let proof_vec = proof.to_vec();

    let public_key_hash_bytes: [u8; 20] = public_key_hash
        .to_vec()
        .try_into()
        .map_err(|_| JsValue::from_str("Invalid public_key_hash length. Expected 20 bytes."))?;

    let after_bytes = if let Some(after_array) = after {
        let after_vec = after_array.to_vec();
        Some(
            after_vec
                .try_into()
                .map_err(|_| JsValue::from_str("Invalid after length. Expected 32 bytes."))?,
        )
    } else {
        None
    };

    let platform_version = PlatformVersion::get(platform_version_number)
        .map_err(|e| JsValue::from_str(&format!("Invalid platform version: {:?}", e)))?;

    let (root_hash, identity_id_option) = Drive::verify_identity_id_by_non_unique_public_key_hash(
        &proof_vec,
        is_proof_subset,
        public_key_hash_bytes,
        after_bytes,
        platform_version,
    )
    .map_err(|e| JsValue::from_str(&format!("Verification failed: {:?}", e)))?;

    Ok(VerifyIdentityIdByNonUniquePublicKeyHashResult {
        root_hash: root_hash.to_vec(),
        identity_id: identity_id_option.map(|id| id.to_vec()),
    })
}
