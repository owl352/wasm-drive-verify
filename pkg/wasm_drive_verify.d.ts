/* tslint:disable */
/* eslint-disable */
export function verifyFullIdentitiesByPublicKeyHashesVec(proof: Uint8Array, public_key_hashes: any, platform_version_number: number): VerifyFullIdentitiesByPublicKeyHashesResult;
export function verifyFullIdentitiesByPublicKeyHashesMap(proof: Uint8Array, public_key_hashes: any, platform_version_number: number): VerifyFullIdentitiesByPublicKeyHashesResult;
export function verifyFullIdentityByIdentityId(proof: Uint8Array, is_proof_subset: boolean, identity_id: Uint8Array, platform_version_number: number): VerifyFullIdentityByIdentityIdResult;
export function verifyFullIdentityByNonUniquePublicKeyHash(identity_proof: Uint8Array | null | undefined, identity_id_public_key_hash_proof: Uint8Array, public_key_hash: Uint8Array, after: Uint8Array | null | undefined, platform_version_number: number): VerifyFullIdentityByNonUniquePublicKeyHashResult;
export function verifyFullIdentityByUniquePublicKeyHash(proof: Uint8Array, public_key_hash: Uint8Array, platform_version_number: number): VerifyFullIdentityByUniquePublicKeyHashResult;
export function verifyIdentitiesContractKeys(proof: Uint8Array, identity_ids: Array<any>, contract_id: Uint8Array, document_type_name: string | null | undefined, purposes: Array<any>, is_proof_subset: boolean, platform_version_number: number): VerifyIdentitiesContractKeysResult;
export function verifyIdentityBalanceAndRevisionForIdentityId(proof: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyIdentityBalanceAndRevisionForIdentityIdResult;
export function verifyIdentityBalanceForIdentityId(proof: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyIdentityBalanceForIdentityIdResult;
export function verifyIdentityBalancesForIdentityIdsVec(proof: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyIdentityBalancesForIdentityIdsResult;
export function verifyIdentityBalancesForIdentityIdsMap(proof: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyIdentityBalancesForIdentityIdsResult;
export function verifyIdentityContractNonce(proof: Uint8Array, identity_id: Uint8Array, contract_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyIdentityContractNonceResult;
export function verifyIdentityIdByNonUniquePublicKeyHash(proof: Uint8Array, is_proof_subset: boolean, public_key_hash: Uint8Array, after: Uint8Array | null | undefined, platform_version_number: number): VerifyIdentityIdByNonUniquePublicKeyHashResult;
export function verifyIdentityIdByUniquePublicKeyHash(proof: Uint8Array, is_proof_subset: boolean, public_key_hash: Uint8Array, platform_version_number: number): VerifyIdentityIdByUniquePublicKeyHashResult;
export function verifyIdentityIdsByUniquePublicKeyHashesVec(proof: Uint8Array, is_proof_subset: boolean, public_key_hashes: any, platform_version_number: number): VerifyIdentityIdsByUniquePublicKeyHashesResult;
export function verifyIdentityIdsByUniquePublicKeyHashesMap(proof: Uint8Array, is_proof_subset: boolean, public_key_hashes: any, platform_version_number: number): VerifyIdentityIdsByUniquePublicKeyHashesResult;
export function verifyIdentityKeysByIdentityId(proof: Uint8Array, identity_id: Uint8Array, specific_key_ids: Array<any> | null | undefined, with_revision: boolean, with_balance: boolean, is_proof_subset: boolean, limit: number | null | undefined, offset: number | null | undefined, platform_version_number: number): VerifyIdentityKeysByIdentityIdResult;
export function verifyIdentityNonce(proof: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyIdentityNonceResult;
export function verifyIdentityRevisionForIdentityId(proof: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyIdentityRevisionForIdentityIdResult;
export function verifyDocumentProof(proof: Uint8Array, contract_js: any, document_type_name: string, where_clauses: any, order_by: any, limit: number | null | undefined, start_at: Uint8Array | null | undefined, start_at_included: boolean, block_time_ms: bigint | null | undefined, platform_version_number: number): VerifyDocumentProofResult;
export function verifyDocumentProofKeepSerialized(proof: Uint8Array, contract_js: any, document_type_name: string, where_clauses: any, order_by: any, limit: number | null | undefined, offset: number | null | undefined, start_at: Uint8Array | null | undefined, start_at_included: boolean, block_time_ms: bigint | null | undefined, platform_version_number: number): VerifyDocumentProofKeepSerializedResult;
export function verifyStartAtDocumentInProof(proof: Uint8Array, contract_js: any, document_type_name: string, where_clauses: any, order_by: any, limit: number | null | undefined, offset: number | null | undefined, start_at: Uint8Array | null | undefined, start_at_included: boolean, block_time_ms: bigint | null | undefined, is_proof_subset: boolean, document_id: Uint8Array, platform_version_number: number): VerifyStartAtDocumentInProofResult;
/**
 * Verify a single document proof and keep it serialized
 */
export function verifySingleDocumentProofKeepSerialized(query: SingleDocumentDriveQueryWasm, is_subset: boolean, proof: Uint8Array, platform_version_number: number): SingleDocumentProofResult;
/**
 * Create a SingleDocumentDriveQuery for a non-contested document
 */
export function createSingleDocumentQuery(contract_id: Uint8Array, document_type_name: string, document_type_keeps_history: boolean, document_id: Uint8Array, block_time_ms?: number | null): SingleDocumentDriveQueryWasm;
/**
 * Create a SingleDocumentDriveQuery for a maybe contested document
 */
export function createSingleDocumentQueryMaybeContested(contract_id: Uint8Array, document_type_name: string, document_type_keeps_history: boolean, document_id: Uint8Array, block_time_ms?: number | null): SingleDocumentDriveQueryWasm;
/**
 * Create a SingleDocumentDriveQuery for a contested document
 */
export function createSingleDocumentQueryContested(contract_id: Uint8Array, document_type_name: string, document_type_keeps_history: boolean, document_id: Uint8Array, block_time_ms?: number | null): SingleDocumentDriveQueryWasm;
export function verifyContract(proof: Uint8Array, contract_known_keeps_history: boolean | null | undefined, is_proof_subset: boolean, in_multiple_contract_proof_form: boolean, contract_id: Uint8Array, platform_version_number: number): VerifyContractResult;
export function verifyContractHistory(proof: Uint8Array, contract_id: Uint8Array, start_at_date: bigint, limit: number | null | undefined, offset: number | null | undefined, platform_version_number: number): VerifyContractHistoryResult;
export function verifyTokenBalancesForIdentityIdVec(proof: Uint8Array, token_ids: any, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenBalancesForIdentityIdResult;
export function verifyTokenBalancesForIdentityIdMap(proof: Uint8Array, token_ids: any, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenBalancesForIdentityIdResult;
export function verifyTokenBalancesForIdentityIdsVec(proof: Uint8Array, token_id: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyTokenBalancesForIdentityIdsResult;
export function verifyTokenBalancesForIdentityIdsMap(proof: Uint8Array, token_id: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyTokenBalancesForIdentityIdsResult;
export function verifyTokenDirectSellingPricesVec(proof: Uint8Array, token_ids: any, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenDirectSellingPricesResult;
export function verifyTokenDirectSellingPricesMap(proof: Uint8Array, token_ids: any, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenDirectSellingPricesResult;
export function verifyTokenInfosForIdentityIdVec(proof: Uint8Array, token_ids: any, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenInfosForIdentityIdResult;
export function verifyTokenInfosForIdentityIdMap(proof: Uint8Array, token_ids: any, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenInfosForIdentityIdResult;
export function verifyTokenInfosForIdentityIdsVec(proof: Uint8Array, token_id: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyTokenInfosForIdentityIdsResult;
export function verifyTokenInfosForIdentityIdsMap(proof: Uint8Array, token_id: Uint8Array, is_proof_subset: boolean, identity_ids: any, platform_version_number: number): VerifyTokenInfosForIdentityIdsResult;
export function verifyTokenPreProgrammedDistributionsVec(proof: Uint8Array, token_id: Uint8Array, start_at_timestamp: bigint | null | undefined, start_at_identity_id: Uint8Array | null | undefined, limit: number | null | undefined, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenPreProgrammedDistributionsResult;
export function verifyTokenPreProgrammedDistributionsMap(proof: Uint8Array, token_id: Uint8Array, start_at_timestamp: bigint | null | undefined, start_at_identity_id: Uint8Array | null | undefined, limit: number | null | undefined, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenPreProgrammedDistributionsResult;
export function verifyTokenStatusesVec(proof: Uint8Array, token_ids: any, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenStatusesResult;
export function verifyTokenStatusesMap(proof: Uint8Array, token_ids: any, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenStatusesResult;
export function verifyTokenBalanceForIdentityId(proof: Uint8Array, token_id: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenBalanceForIdentityIdResult;
export function verifyTokenContractInfo(proof: Uint8Array, token_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenContractInfoResult;
export function verifyTokenDirectSellingPrice(proof: Uint8Array, token_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenDirectSellingPriceResult;
export function verifyTokenInfoForIdentityId(proof: Uint8Array, token_id: Uint8Array, identity_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenInfoForIdentityIdResult;
export function verifyTokenPerpetualDistributionLastPaidTime(proof: Uint8Array, token_id: Uint8Array, identity_id: Uint8Array, distribution_type_js: any, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenPerpetualDistributionLastPaidTimeResult;
export function verifyTokenStatus(proof: Uint8Array, token_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenStatusResult;
export function verifyTokenTotalSupplyAndAggregatedIdentityBalance(proof: Uint8Array, token_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult;
/**
 * Verify action signers and return as an array of [signer_id, power] pairs
 */
export function verifyActionSignersVec(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, action_status: number, action_id: Uint8Array, is_proof_subset: boolean, platform_version_number: number): VerifyActionSignersResult;
/**
 * Verify action signers and return as a map with signer_id as key
 */
export function verifyActionSignersMap(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, action_status: number, action_id: Uint8Array, is_proof_subset: boolean, platform_version_number: number): VerifyActionSignersResult;
/**
 * Verify action infos in contract and return as an array of [action_id, action] pairs
 */
export function verifyActionInfosInContractVec(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, action_status: number, start_action_id: Uint8Array | null | undefined, start_at_included: boolean | null | undefined, limit: number | null | undefined, is_proof_subset: boolean, platform_version_number: number): VerifyActionInfosInContractResult;
/**
 * Verify action infos in contract and return as a map with action_id as key
 */
export function verifyActionInfosInContractMap(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, action_status: number, start_action_id: Uint8Array | null | undefined, start_at_included: boolean | null | undefined, limit: number | null | undefined, is_proof_subset: boolean, platform_version_number: number): VerifyActionInfosInContractResult;
/**
 * Verify group infos in contract and return as an array of [position, group] pairs
 */
export function verifyGroupInfosInContractVec(proof: Uint8Array, contract_id: Uint8Array, start_group_contract_position: number | null | undefined, start_at_included: boolean | null | undefined, limit: number | null | undefined, is_proof_subset: boolean, platform_version_number: number): VerifyGroupInfosInContractResult;
/**
 * Verify group infos in contract and return as a map with position as key
 */
export function verifyGroupInfosInContractMap(proof: Uint8Array, contract_id: Uint8Array, start_group_contract_position: number | null | undefined, start_at_included: boolean | null | undefined, limit: number | null | undefined, is_proof_subset: boolean, platform_version_number: number): VerifyGroupInfosInContractResult;
export function verifyActionSignersTotalPower(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, action_status: number | null | undefined, action_id: Uint8Array, action_signer_id: Uint8Array, is_proof_subset: boolean, platform_version_number: number): VerifyActionSignersTotalPowerResult;
export function verifyGroupInfo(proof: Uint8Array, contract_id: Uint8Array, group_contract_position: number, is_proof_subset: boolean, platform_version_number: number): VerifyGroupInfoResult;
export function verifyIdentityVotesGivenProofVec(proof: Uint8Array, query_cbor: Uint8Array, contract_lookup: any, platform_version_number: number): VerifyIdentityVotesGivenProofResult;
export function verifyIdentityVotesGivenProofMap(proof: Uint8Array, query_cbor: Uint8Array, contract_lookup: any, platform_version_number: number): VerifyIdentityVotesGivenProofResult;
export function verifyVotePollsEndDateQueryVec(proof: Uint8Array, query_cbor: Uint8Array, platform_version_number: number): VerifyVotePollsEndDateQueryResult;
export function verifyVotePollsEndDateQueryMap(proof: Uint8Array, query_cbor: Uint8Array, platform_version_number: number): VerifyVotePollsEndDateQueryResult;
export function verifyContestsProof(proof: Uint8Array, contract_cbor: Uint8Array, document_type_name: string, index_name: string, start_at_value: Uint8Array | null | undefined, start_index_values: Array<any> | null | undefined, end_index_values: Array<any> | null | undefined, limit: number | null | undefined, order_ascending: boolean, platform_version_number: number): VerifyContestsProofResult;
export function verifyMasternodeVote(proof: Uint8Array, masternode_pro_tx_hash: Uint8Array, vote_cbor: Uint8Array, data_contract_cbor: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifyMasternodeVoteResult;
export function verifySpecializedBalance(proof: Uint8Array, specialized_balance_id: Uint8Array, verify_subset_of_proof: boolean, platform_version_number: number): VerifySpecializedBalanceResult;
export function verifyVotePollVoteStateProof(proof: Uint8Array, contract_cbor: Uint8Array, document_type_name: string, index_name: string, contested_document_resource_vote_poll_bytes: Uint8Array, result_type: string, allow_include_locked_and_abstaining_vote_tally: boolean, platform_version_number: number): VerifyVotePollVoteStateProofResult;
export function verifyVotePollVotesProof(proof: Uint8Array, contract_cbor: Uint8Array, document_type_name: string, index_name: string, contestant_id: Uint8Array, contested_document_resource_vote_poll_bytes: Uint8Array, start_at: Uint8Array | null | undefined, limit: number | null | undefined, order_ascending: boolean, platform_version_number: number): VerifyVotePollVotesProofResult;
/**
 * Verifies elements at a specific path with given keys
 *
 * **Note**: This function is currently not fully implemented due to limitations in the
 * WASM environment. The Element type from grovedb is not exposed through the verify
 * feature, making it impossible to properly serialize and return element data.
 *
 * For document verification, please use the document-specific verification functions
 * such as `verify_proof_keep_serialized` which are designed to work within these
 * limitations.
 *
 * # Alternative Approaches:
 *
 * 1. For document queries: Use `DriveDocumentQuery.verify_proof_keep_serialized()`
 * 2. For identity queries: Use the identity-specific verification functions
 * 3. For contract queries: Use `verify_contract()`
 *
 * This limitation exists because:
 * - The Element enum from grovedb contains references to internal tree structures
 * - These structures cannot be safely exposed across the WASM boundary
 * - The verify feature intentionally excludes server-side types for security
 */
export function verifyElements(_proof: Uint8Array, _path: Array<any>, _keys: Array<any>, _platform_version_number: number): VerifyElementsResult;
export function verifyEpochInfos(proof: Uint8Array, current_epoch: number, start_epoch: number | null | undefined, count: number, ascending: boolean, platform_version_number: number): VerifyEpochInfosResult;
export function verifyEpochProposersByRangeVec(proof: Uint8Array, epoch_index: number, limit: number | null | undefined, start_at_proposer_id: Uint8Array | null | undefined, start_at_included: boolean | null | undefined, platform_version_number: number): VerifyEpochProposersResult;
export function verifyEpochProposersByRangeMap(proof: Uint8Array, epoch_index: number, limit: number | null | undefined, start_at_proposer_id: Uint8Array | null | undefined, start_at_included: boolean | null | undefined, platform_version_number: number): VerifyEpochProposersResult;
export function verifyEpochProposersByIdsVec(proof: Uint8Array, epoch_index: number, proposer_ids: any, platform_version_number: number): VerifyEpochProposersResult;
export function verifyEpochProposersByIdsMap(proof: Uint8Array, epoch_index: number, proposer_ids: any, platform_version_number: number): VerifyEpochProposersResult;
export function verifyTotalCreditsInSystem(proof: Uint8Array, core_subsidy_halving_interval: number, activation_core_height: number, current_core_height: number, platform_version_number: number): VerifyTotalCreditsInSystemResult;
export function verifyUpgradeState(proof: Uint8Array, platform_version_number: number): VerifyUpgradeStateResult;
export function verifyUpgradeVoteStatus(proof: Uint8Array, start_protx_hash: Uint8Array | null | undefined, count: number, platform_version_number: number): VerifyUpgradeVoteStatusResult;
export function tokenTransitionIntoPathQuery(token_transition_js: any, contract_js: any, owner_id: Uint8Array, platform_version_number: number): TokenTransitionPathQueryResult;
export function tokenBalanceForIdentityIdQuery(token_id: Uint8Array, identity_id: Uint8Array): TokenTransitionPathQueryResult;
export function tokenBalancesForIdentityIdsQuery(token_id: Uint8Array, identity_ids_js: any): TokenTransitionPathQueryResult;
export function tokenInfoForIdentityIdQuery(token_id: Uint8Array, identity_id: Uint8Array): TokenTransitionPathQueryResult;
export function tokenDirectPurchasePriceQuery(token_id: Uint8Array): TokenTransitionPathQueryResult;
export function groupActiveAndClosedActionSingleSignerQuery(contract_id: Uint8Array, group_contract_position: number, action_id: Uint8Array, identity_id: Uint8Array): TokenTransitionPathQueryResult;
export function verifyStateTransitionWasExecutedWithProof(state_transition_js: any, block_height: bigint, block_time_ms: bigint, block_core_height: number, proof: Uint8Array, known_contracts_js: any, platform_version_number: number): VerifyStateTransitionWasExecutedWithProofResult;
export function main(): void;
/**
 * WASM wrapper for SingleDocumentDriveQuery
 */
export class SingleDocumentDriveQueryWasm {
  free(): void;
  /**
   * Create a new SingleDocumentDriveQuery
   */
  constructor(contract_id: Uint8Array, document_type_name: string, document_type_keeps_history: boolean, document_id: Uint8Array, block_time_ms: number | null | undefined, contested_status: number);
  /**
   * Get the contract ID
   */
  readonly contractId: Uint8Array;
  /**
   * Get the document type name
   */
  readonly documentTypeName: string;
  /**
   * Get whether the document type keeps history
   */
  readonly documentTypeKeepsHistory: boolean;
  /**
   * Get the document ID
   */
  readonly documentId: Uint8Array;
  /**
   * Get the block time in milliseconds
   */
  readonly blockTimeMs: number | undefined;
  /**
   * Get the contested status
   */
  readonly contestedStatus: number;
}
/**
 * Result of a single document proof verification
 */
export class SingleDocumentProofResult {
  private constructor();
  free(): void;
  /**
   * Check if a document was found
   */
  hasDocument(): boolean;
  /**
   * Get the root hash
   */
  readonly rootHash: Uint8Array;
  /**
   * Get the serialized document (if found)
   */
  readonly documentSerialized: Uint8Array | undefined;
}
export class TokenTransitionPathQueryResult {
  private constructor();
  free(): void;
  readonly path_query: any;
}
export class VerifyActionInfosInContractResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly actions: any;
}
export class VerifyActionSignersResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly signers: any;
}
export class VerifyActionSignersTotalPowerResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly action_status: number;
  readonly total_power: bigint;
}
export class VerifyContestsProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly contests: Array<any>;
}
export class VerifyContractHistoryResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly contract_history: any;
}
export class VerifyContractResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly contract: Uint8Array | undefined;
}
export class VerifyDocumentProofKeepSerializedResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly serialized_documents: any;
}
export class VerifyDocumentProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly documents: Array<any>;
}
export class VerifyElementsResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly elements: any;
}
export class VerifyEpochInfosResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly epoch_infos: any;
}
export class VerifyEpochProposersResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly proposers: any;
}
export class VerifyFullIdentitiesByPublicKeyHashesResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identities: any;
}
export class VerifyFullIdentityByIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity: Uint8Array | undefined;
}
export class VerifyFullIdentityByNonUniquePublicKeyHashResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity: any;
}
export class VerifyFullIdentityByUniquePublicKeyHashResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity: Uint8Array | undefined;
}
export class VerifyGroupInfoResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly group: any;
}
export class VerifyGroupInfosInContractResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly groups: any;
}
export class VerifyIdentitiesContractKeysResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly keys: any;
}
export class VerifyIdentityBalanceAndRevisionForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balance: bigint | undefined;
  readonly revision: bigint | undefined;
}
export class VerifyIdentityBalanceForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balance: bigint | undefined;
}
export class VerifyIdentityBalancesForIdentityIdsResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balances: any;
}
export class VerifyIdentityContractNonceResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly nonce: bigint | undefined;
}
export class VerifyIdentityIdByNonUniquePublicKeyHashResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity_id: Uint8Array | undefined;
}
export class VerifyIdentityIdByUniquePublicKeyHashResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity_id: Uint8Array | undefined;
}
export class VerifyIdentityIdsByUniquePublicKeyHashesResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly identity_ids: any;
}
export class VerifyIdentityKeysByIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly loaded_identity_keys: Uint8Array[] | undefined;
  readonly not_found_public_keys: Uint32Array;
}
export class VerifyIdentityNonceResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly nonce: bigint | undefined;
}
export class VerifyIdentityRevisionForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly revision: bigint | undefined;
}
export class VerifyIdentityVotesGivenProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly votes: any;
}
export class VerifyMasternodeVoteResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly vote: Uint8Array | undefined;
}
export class VerifySpecializedBalanceResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balance: bigint | undefined;
}
export class VerifyStartAtDocumentInProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly document: any;
}
export class VerifyStateTransitionWasExecutedWithProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly proof_result: any;
}
export class VerifyTokenBalanceForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balance: bigint | undefined;
}
export class VerifyTokenBalancesForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balances: any;
}
export class VerifyTokenBalancesForIdentityIdsResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly balances: any;
}
export class VerifyTokenContractInfoResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly contract_info: any;
}
export class VerifyTokenDirectSellingPriceResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly price: any;
}
export class VerifyTokenDirectSellingPricesResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly prices: any;
}
export class VerifyTokenInfoForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly token_info: any;
}
export class VerifyTokenInfosForIdentityIdResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly token_infos: any;
}
export class VerifyTokenInfosForIdentityIdsResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly token_infos: any;
}
export class VerifyTokenPerpetualDistributionLastPaidTimeResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly last_paid_time: any;
}
export class VerifyTokenPreProgrammedDistributionsResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly distributions: any;
}
export class VerifyTokenStatusResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly status: any;
}
export class VerifyTokenStatusesResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly statuses: any;
}
export class VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly total_supply_and_balance: any;
}
export class VerifyTotalCreditsInSystemResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly total_credits: bigint;
}
export class VerifyUpgradeStateResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly upgrade_state: any;
}
export class VerifyUpgradeVoteStatusResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly vote_status: any;
}
export class VerifyVotePollVoteStateProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly result: any;
}
export class VerifyVotePollVotesProofResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly votes: Array<any>;
}
export class VerifyVotePollsEndDateQueryResult {
  private constructor();
  free(): void;
  readonly root_hash: Uint8Array;
  readonly vote_polls: any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly verifyFullIdentitiesByPublicKeyHashesVec: (a: number, b: number, c: number, d: number) => void;
  readonly verifyFullIdentitiesByPublicKeyHashesMap: (a: number, b: number, c: number, d: number) => void;
  readonly verifyFullIdentityByIdentityId: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyFullIdentityByNonUniquePublicKeyHash: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyFullIdentityByUniquePublicKeyHash: (a: number, b: number, c: number, d: number) => void;
  readonly verifyIdentitiesContractKeys: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly __wbg_verifyidentitybalanceandrevisionforidentityidresult_free: (a: number, b: number) => void;
  readonly verifyidentitybalanceandrevisionforidentityidresult_root_hash: (a: number) => number;
  readonly verifyidentitybalanceandrevisionforidentityidresult_balance: (a: number, b: number) => void;
  readonly verifyidentitybalanceandrevisionforidentityidresult_revision: (a: number, b: number) => void;
  readonly verifyIdentityBalanceAndRevisionForIdentityId: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_verifyidentitybalanceforidentityidresult_free: (a: number, b: number) => void;
  readonly verifyidentitybalanceforidentityidresult_root_hash: (a: number) => number;
  readonly verifyidentitybalanceforidentityidresult_balance: (a: number, b: number) => void;
  readonly verifyIdentityBalanceForIdentityId: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityBalancesForIdentityIdsVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityBalancesForIdentityIdsMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityContractNonce: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyIdentityIdByNonUniquePublicKeyHash: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyIdentityIdByUniquePublicKeyHash: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityIdsByUniquePublicKeyHashesVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityIdsByUniquePublicKeyHashesMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_verifyidentitykeysbyidentityidresult_free: (a: number, b: number) => void;
  readonly verifyIdentityKeysByIdentityId: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly verifyidentitykeysbyidentityidresult_root_hash: (a: number) => number;
  readonly verifyidentitykeysbyidentityidresult_loaded_identity_keys: (a: number, b: number) => void;
  readonly verifyidentitykeysbyidentityidresult_not_found_public_keys: (a: number, b: number) => void;
  readonly verifyIdentityNonce: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityRevisionForIdentityId: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyDocumentProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: bigint, m: number) => void;
  readonly verifyDocumentProofKeepSerialized: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: bigint, n: number) => void;
  readonly verifyStartAtDocumentInProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: bigint, n: number, o: number, p: number) => void;
  readonly __wbg_singledocumentdrivequerywasm_free: (a: number, b: number) => void;
  readonly singledocumentdrivequerywasm_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
  readonly singledocumentdrivequerywasm_contractId: (a: number, b: number) => void;
  readonly singledocumentdrivequerywasm_documentTypeName: (a: number, b: number) => void;
  readonly singledocumentdrivequerywasm_documentTypeKeepsHistory: (a: number) => number;
  readonly singledocumentdrivequerywasm_documentId: (a: number, b: number) => void;
  readonly singledocumentdrivequerywasm_blockTimeMs: (a: number, b: number) => void;
  readonly singledocumentdrivequerywasm_contestedStatus: (a: number) => number;
  readonly __wbg_singledocumentproofresult_free: (a: number, b: number) => void;
  readonly singledocumentproofresult_rootHash: (a: number, b: number) => void;
  readonly singledocumentproofresult_documentSerialized: (a: number, b: number) => void;
  readonly singledocumentproofresult_hasDocument: (a: number) => number;
  readonly verifySingleDocumentProofKeepSerialized: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly createSingleDocumentQuery: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly createSingleDocumentQueryMaybeContested: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly createSingleDocumentQueryContested: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly verifycontractresult_root_hash: (a: number) => number;
  readonly verifyContract: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifyContractHistory: (a: number, b: number, c: number, d: bigint, e: number, f: number, g: number) => void;
  readonly verifyTokenBalancesForIdentityIdVec: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenBalancesForIdentityIdMap: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenBalancesForIdentityIdsVec: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenBalancesForIdentityIdsMap: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenDirectSellingPricesVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenDirectSellingPricesMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenInfosForIdentityIdVec: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenInfosForIdentityIdMap: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenInfosForIdentityIdsVec: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenInfosForIdentityIdsMap: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenPreProgrammedDistributionsVec: (a: number, b: number, c: number, d: number, e: bigint, f: number, g: number, h: number, i: number) => void;
  readonly verifyTokenPreProgrammedDistributionsMap: (a: number, b: number, c: number, d: number, e: bigint, f: number, g: number, h: number, i: number) => void;
  readonly verifyTokenStatusesVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenStatusesMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenBalanceForIdentityId: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenContractInfo: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenDirectSellingPrice: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenInfoForIdentityId: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyTokenPerpetualDistributionLastPaidTime: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifyTokenStatus: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTokenTotalSupplyAndAggregatedIdentityBalance: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyActionSignersVec: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly verifyActionSignersMap: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly __wbg_verifyactioninfosincontractresult_free: (a: number, b: number) => void;
  readonly verifyactioninfosincontractresult_root_hash: (a: number) => number;
  readonly verifyactioninfosincontractresult_actions: (a: number) => number;
  readonly verifyActionInfosInContractVec: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly verifyActionInfosInContractMap: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly verifyGroupInfosInContractVec: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly verifyGroupInfosInContractMap: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly __wbg_verifyactionsignerstotalpowerresult_free: (a: number, b: number) => void;
  readonly verifyactionsignerstotalpowerresult_root_hash: (a: number) => number;
  readonly verifyactionsignerstotalpowerresult_action_status: (a: number) => number;
  readonly verifyactionsignerstotalpowerresult_total_power: (a: number) => bigint;
  readonly verifyActionSignersTotalPower: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly verifyGroupInfo: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyIdentityVotesGivenProofVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyIdentityVotesGivenProofMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyVotePollsEndDateQueryVec: (a: number, b: number, c: number, d: number) => void;
  readonly verifyVotePollsEndDateQueryMap: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_verifycontestsproofresult_free: (a: number, b: number) => void;
  readonly verifycontestsproofresult_root_hash: (a: number) => number;
  readonly verifycontestsproofresult_contests: (a: number) => number;
  readonly verifyContestsProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => void;
  readonly verifyMasternodeVote: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifySpecializedBalance: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyVotePollVoteStateProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => void;
  readonly verifyVotePollVotesProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => void;
  readonly verifyElements: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyEpochInfos: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifyEpochProposersByRangeVec: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifyEpochProposersByRangeMap: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly verifyEpochProposersByIdsVec: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyEpochProposersByIdsMap: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyTotalCreditsInSystem: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly verifyUpgradeState: (a: number, b: number, c: number) => void;
  readonly verifyUpgradeVoteStatus: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_tokentransitionpathqueryresult_free: (a: number, b: number) => void;
  readonly tokentransitionpathqueryresult_path_query: (a: number) => number;
  readonly tokenTransitionIntoPathQuery: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly tokenBalanceForIdentityIdQuery: (a: number, b: number, c: number) => void;
  readonly tokenBalancesForIdentityIdsQuery: (a: number, b: number, c: number) => void;
  readonly tokenInfoForIdentityIdQuery: (a: number, b: number, c: number) => void;
  readonly tokenDirectPurchasePriceQuery: (a: number, b: number) => void;
  readonly groupActiveAndClosedActionSingleSignerQuery: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyStateTransitionWasExecutedWithProof: (a: number, b: number, c: bigint, d: bigint, e: number, f: number, g: number, h: number) => void;
  readonly main: () => void;
  readonly __wbg_verifyvotepollvotesproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyelementsresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentityidbynonuniquepublickeyhashresult_free: (a: number, b: number) => void;
  readonly __wbg_verifycontracthistoryresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenbalancesforidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentitynonceresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenperpetualdistributionlastpaidtimeresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyepochproposersresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentityidbyuniquepublickeyhashresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenpreprogrammeddistributionsresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyvotepollvotestateproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentityvotesgivenproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifygroupinfosincontractresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokentotalsupplyandaggregatedidentitybalanceresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyfullidentitybyuniquepublickeyhashresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyfullidentitybyidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenstatusesresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyfullidentitybynonuniquepublickeyhashresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyvotepollsenddatequeryresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytotalcreditsinsystemresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyepochinfosresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyupgradevotestatusresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentitycontractnonceresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyupgradestateresult_free: (a: number, b: number) => void;
  readonly __wbg_verifystartatdocumentinproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyfullidentitiesbypublickeyhashesresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokencontractinforesult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokeninfosforidentityidsresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyspecializedbalanceresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokeninfosforidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokeninfoforidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifymasternodevoteresult_free: (a: number, b: number) => void;
  readonly __wbg_verifygroupinforesult_free: (a: number, b: number) => void;
  readonly __wbg_verifycontractresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenbalanceforidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyactionsignersresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentitybalancesforidentityidsresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenbalancesforidentityidsresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentityidsbyuniquepublickeyhashesresult_free: (a: number, b: number) => void;
  readonly __wbg_verifystatetransitionwasexecutedwithproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokenstatusresult_free: (a: number, b: number) => void;
  readonly __wbg_verifydocumentproofresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentityrevisionforidentityidresult_free: (a: number, b: number) => void;
  readonly __wbg_verifyidentitiescontractkeysresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokendirectsellingpriceresult_free: (a: number, b: number) => void;
  readonly __wbg_verifydocumentproofkeepserializedresult_free: (a: number, b: number) => void;
  readonly __wbg_verifytokendirectsellingpricesresult_free: (a: number, b: number) => void;
  readonly verifyvotepollvotesproofresult_votes: (a: number) => number;
  readonly verifyvotepollvotesproofresult_root_hash: (a: number) => number;
  readonly verifyelementsresult_elements: (a: number) => number;
  readonly verifyelementsresult_root_hash: (a: number) => number;
  readonly verifyidentityidbynonuniquepublickeyhashresult_identity_id: (a: number, b: number) => void;
  readonly verifyidentityidbynonuniquepublickeyhashresult_root_hash: (a: number) => number;
  readonly verifycontracthistoryresult_contract_history: (a: number) => number;
  readonly verifycontracthistoryresult_root_hash: (a: number) => number;
  readonly verifytokenbalancesforidentityidresult_balances: (a: number) => number;
  readonly verifytokenbalancesforidentityidresult_root_hash: (a: number) => number;
  readonly verifyidentitynonceresult_nonce: (a: number, b: number) => void;
  readonly verifyidentitynonceresult_root_hash: (a: number) => number;
  readonly verifytokenperpetualdistributionlastpaidtimeresult_last_paid_time: (a: number) => number;
  readonly verifytokenperpetualdistributionlastpaidtimeresult_root_hash: (a: number) => number;
  readonly verifyepochproposersresult_proposers: (a: number) => number;
  readonly verifyepochproposersresult_root_hash: (a: number) => number;
  readonly verifyidentityidbyuniquepublickeyhashresult_identity_id: (a: number, b: number) => void;
  readonly verifyidentityidbyuniquepublickeyhashresult_root_hash: (a: number) => number;
  readonly verifytokenpreprogrammeddistributionsresult_distributions: (a: number) => number;
  readonly verifytokenpreprogrammeddistributionsresult_root_hash: (a: number) => number;
  readonly verifyvotepollvotestateproofresult_result: (a: number) => number;
  readonly verifyvotepollvotestateproofresult_root_hash: (a: number) => number;
  readonly verifyidentityvotesgivenproofresult_votes: (a: number) => number;
  readonly verifyidentityvotesgivenproofresult_root_hash: (a: number) => number;
  readonly verifygroupinfosincontractresult_groups: (a: number) => number;
  readonly verifygroupinfosincontractresult_root_hash: (a: number) => number;
  readonly verifytokentotalsupplyandaggregatedidentitybalanceresult_total_supply_and_balance: (a: number) => number;
  readonly verifytokentotalsupplyandaggregatedidentitybalanceresult_root_hash: (a: number) => number;
  readonly verifyfullidentitybyuniquepublickeyhashresult_identity: (a: number, b: number) => void;
  readonly verifyfullidentitybyuniquepublickeyhashresult_root_hash: (a: number) => number;
  readonly verifyfullidentitybyidentityidresult_identity: (a: number, b: number) => void;
  readonly verifyfullidentitybyidentityidresult_root_hash: (a: number) => number;
  readonly verifytokenstatusesresult_statuses: (a: number) => number;
  readonly verifytokenstatusesresult_root_hash: (a: number) => number;
  readonly verifyfullidentitybynonuniquepublickeyhashresult_identity: (a: number) => number;
  readonly verifyfullidentitybynonuniquepublickeyhashresult_root_hash: (a: number) => number;
  readonly verifyvotepollsenddatequeryresult_vote_polls: (a: number) => number;
  readonly verifyvotepollsenddatequeryresult_root_hash: (a: number) => number;
  readonly verifytotalcreditsinsystemresult_total_credits: (a: number) => bigint;
  readonly verifytotalcreditsinsystemresult_root_hash: (a: number) => number;
  readonly verifyepochinfosresult_epoch_infos: (a: number) => number;
  readonly verifyepochinfosresult_root_hash: (a: number) => number;
  readonly verifyupgradevotestatusresult_vote_status: (a: number) => number;
  readonly verifyupgradevotestatusresult_root_hash: (a: number) => number;
  readonly verifyidentitycontractnonceresult_nonce: (a: number, b: number) => void;
  readonly verifyidentitycontractnonceresult_root_hash: (a: number) => number;
  readonly verifyupgradestateresult_upgrade_state: (a: number) => number;
  readonly verifyupgradestateresult_root_hash: (a: number) => number;
  readonly verifystartatdocumentinproofresult_document: (a: number) => number;
  readonly verifystartatdocumentinproofresult_root_hash: (a: number) => number;
  readonly verifyfullidentitiesbypublickeyhashesresult_identities: (a: number) => number;
  readonly verifyfullidentitiesbypublickeyhashesresult_root_hash: (a: number) => number;
  readonly verifytokencontractinforesult_contract_info: (a: number) => number;
  readonly verifytokencontractinforesult_root_hash: (a: number) => number;
  readonly verifytokeninfosforidentityidsresult_token_infos: (a: number) => number;
  readonly verifytokeninfosforidentityidsresult_root_hash: (a: number) => number;
  readonly verifyspecializedbalanceresult_balance: (a: number, b: number) => void;
  readonly verifyspecializedbalanceresult_root_hash: (a: number) => number;
  readonly verifytokeninfosforidentityidresult_token_infos: (a: number) => number;
  readonly verifytokeninfosforidentityidresult_root_hash: (a: number) => number;
  readonly verifytokeninfoforidentityidresult_token_info: (a: number) => number;
  readonly verifytokeninfoforidentityidresult_root_hash: (a: number) => number;
  readonly verifymasternodevoteresult_vote: (a: number, b: number) => void;
  readonly verifymasternodevoteresult_root_hash: (a: number) => number;
  readonly verifygroupinforesult_group: (a: number) => number;
  readonly verifygroupinforesult_root_hash: (a: number) => number;
  readonly verifycontractresult_contract: (a: number, b: number) => void;
  readonly verifytokenbalanceforidentityidresult_balance: (a: number, b: number) => void;
  readonly verifytokenbalanceforidentityidresult_root_hash: (a: number) => number;
  readonly verifyactionsignersresult_signers: (a: number) => number;
  readonly verifyactionsignersresult_root_hash: (a: number) => number;
  readonly verifyidentitybalancesforidentityidsresult_balances: (a: number) => number;
  readonly verifyidentitybalancesforidentityidsresult_root_hash: (a: number) => number;
  readonly verifytokenbalancesforidentityidsresult_balances: (a: number) => number;
  readonly verifytokenbalancesforidentityidsresult_root_hash: (a: number) => number;
  readonly verifyidentityidsbyuniquepublickeyhashesresult_identity_ids: (a: number) => number;
  readonly verifyidentityidsbyuniquepublickeyhashesresult_root_hash: (a: number) => number;
  readonly verifystatetransitionwasexecutedwithproofresult_proof_result: (a: number) => number;
  readonly verifystatetransitionwasexecutedwithproofresult_root_hash: (a: number) => number;
  readonly verifytokenstatusresult_status: (a: number) => number;
  readonly verifytokenstatusresult_root_hash: (a: number) => number;
  readonly verifydocumentproofresult_documents: (a: number) => number;
  readonly verifydocumentproofresult_root_hash: (a: number) => number;
  readonly verifyidentityrevisionforidentityidresult_revision: (a: number, b: number) => void;
  readonly verifyidentityrevisionforidentityidresult_root_hash: (a: number) => number;
  readonly verifyidentitiescontractkeysresult_keys: (a: number) => number;
  readonly verifyidentitiescontractkeysresult_root_hash: (a: number) => number;
  readonly verifytokendirectsellingpriceresult_price: (a: number) => number;
  readonly verifytokendirectsellingpriceresult_root_hash: (a: number) => number;
  readonly verifydocumentproofkeepserializedresult_serialized_documents: (a: number) => number;
  readonly verifydocumentproofkeepserializedresult_root_hash: (a: number) => number;
  readonly verifytokendirectsellingpricesresult_prices: (a: number) => number;
  readonly verifytokendirectsellingpricesresult_root_hash: (a: number) => number;
  readonly rustsecp256k1_v0_10_0_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_10_0_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly __wbindgen_export_0: (a: number) => void;
  readonly __wbindgen_export_1: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_2: (a: number, b: number) => number;
  readonly __wbindgen_export_3: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
