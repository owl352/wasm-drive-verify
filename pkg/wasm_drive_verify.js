let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export_0(addHeapObject(e));
    }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
 * @param {Uint8Array} proof
 * @param {any} public_key_hashes
 * @param {number} platform_version_number
 * @returns {VerifyFullIdentitiesByPublicKeyHashesResult}
 */
export function verifyFullIdentitiesByPublicKeyHashesVec(proof, public_key_hashes, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyFullIdentitiesByPublicKeyHashesVec(retptr, addBorrowedObject(proof), addBorrowedObject(public_key_hashes), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyFullIdentitiesByPublicKeyHashesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} public_key_hashes
 * @param {number} platform_version_number
 * @returns {VerifyFullIdentitiesByPublicKeyHashesResult}
 */
export function verifyFullIdentitiesByPublicKeyHashesMap(proof, public_key_hashes, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyFullIdentitiesByPublicKeyHashesMap(retptr, addBorrowedObject(proof), addBorrowedObject(public_key_hashes), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyFullIdentitiesByPublicKeyHashesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {Uint8Array} identity_id
 * @param {number} platform_version_number
 * @returns {VerifyFullIdentityByIdentityIdResult}
 */
export function verifyFullIdentityByIdentityId(proof, is_proof_subset, identity_id, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyFullIdentityByIdentityId(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(identity_id), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyFullIdentityByIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array | null | undefined} identity_proof
 * @param {Uint8Array} identity_id_public_key_hash_proof
 * @param {Uint8Array} public_key_hash
 * @param {Uint8Array | null | undefined} after
 * @param {number} platform_version_number
 * @returns {VerifyFullIdentityByNonUniquePublicKeyHashResult}
 */
export function verifyFullIdentityByNonUniquePublicKeyHash(identity_proof, identity_id_public_key_hash_proof, public_key_hash, after, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyFullIdentityByNonUniquePublicKeyHash(retptr, isLikeNone(identity_proof) ? 0 : addHeapObject(identity_proof), addBorrowedObject(identity_id_public_key_hash_proof), addBorrowedObject(public_key_hash), isLikeNone(after) ? 0 : addHeapObject(after), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyFullIdentityByNonUniquePublicKeyHashResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} public_key_hash
 * @param {number} platform_version_number
 * @returns {VerifyFullIdentityByUniquePublicKeyHashResult}
 */
export function verifyFullIdentityByUniquePublicKeyHash(proof, public_key_hash, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyFullIdentityByUniquePublicKeyHash(retptr, addBorrowedObject(proof), addBorrowedObject(public_key_hash), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyFullIdentityByUniquePublicKeyHashResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Array<any>} identity_ids
 * @param {Uint8Array} contract_id
 * @param {string | null | undefined} document_type_name
 * @param {Array<any>} purposes
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyIdentitiesContractKeysResult}
 */
export function verifyIdentitiesContractKeys(proof, identity_ids, contract_id, document_type_name, purposes, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = isLikeNone(document_type_name) ? 0 : passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        var len0 = WASM_VECTOR_LEN;
        wasm.verifyIdentitiesContractKeys(retptr, addBorrowedObject(proof), addBorrowedObject(identity_ids), addBorrowedObject(contract_id), ptr0, len0, addBorrowedObject(purposes), is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentitiesContractKeysResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyIdentityBalanceAndRevisionForIdentityIdResult}
 */
export function verifyIdentityBalanceAndRevisionForIdentityId(proof, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityBalanceAndRevisionForIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityBalanceAndRevisionForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyIdentityBalanceForIdentityIdResult}
 */
export function verifyIdentityBalanceForIdentityId(proof, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityBalanceForIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityBalanceForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyIdentityBalancesForIdentityIdsResult}
 */
export function verifyIdentityBalancesForIdentityIdsVec(proof, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityBalancesForIdentityIdsVec(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityBalancesForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyIdentityBalancesForIdentityIdsResult}
 */
export function verifyIdentityBalancesForIdentityIdsMap(proof, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityBalancesForIdentityIdsMap(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityBalancesForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {Uint8Array} contract_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyIdentityContractNonceResult}
 */
export function verifyIdentityContractNonce(proof, identity_id, contract_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityContractNonce(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), addBorrowedObject(contract_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityContractNonceResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {Uint8Array} public_key_hash
 * @param {Uint8Array | null | undefined} after
 * @param {number} platform_version_number
 * @returns {VerifyIdentityIdByNonUniquePublicKeyHashResult}
 */
export function verifyIdentityIdByNonUniquePublicKeyHash(proof, is_proof_subset, public_key_hash, after, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityIdByNonUniquePublicKeyHash(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(public_key_hash), isLikeNone(after) ? 0 : addHeapObject(after), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityIdByNonUniquePublicKeyHashResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {Uint8Array} public_key_hash
 * @param {number} platform_version_number
 * @returns {VerifyIdentityIdByUniquePublicKeyHashResult}
 */
export function verifyIdentityIdByUniquePublicKeyHash(proof, is_proof_subset, public_key_hash, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityIdByUniquePublicKeyHash(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(public_key_hash), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityIdByUniquePublicKeyHashResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {any} public_key_hashes
 * @param {number} platform_version_number
 * @returns {VerifyIdentityIdsByUniquePublicKeyHashesResult}
 */
export function verifyIdentityIdsByUniquePublicKeyHashesVec(proof, is_proof_subset, public_key_hashes, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityIdsByUniquePublicKeyHashesVec(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(public_key_hashes), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityIdsByUniquePublicKeyHashesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean} is_proof_subset
 * @param {any} public_key_hashes
 * @param {number} platform_version_number
 * @returns {VerifyIdentityIdsByUniquePublicKeyHashesResult}
 */
export function verifyIdentityIdsByUniquePublicKeyHashesMap(proof, is_proof_subset, public_key_hashes, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityIdsByUniquePublicKeyHashesMap(retptr, addBorrowedObject(proof), is_proof_subset, addBorrowedObject(public_key_hashes), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityIdsByUniquePublicKeyHashesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {Array<any> | null | undefined} specific_key_ids
 * @param {boolean} with_revision
 * @param {boolean} with_balance
 * @param {boolean} is_proof_subset
 * @param {number | null | undefined} limit
 * @param {number | null | undefined} offset
 * @param {number} platform_version_number
 * @returns {VerifyIdentityKeysByIdentityIdResult}
 */
export function verifyIdentityKeysByIdentityId(proof, identity_id, specific_key_ids, with_revision, with_balance, is_proof_subset, limit, offset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityKeysByIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), isLikeNone(specific_key_ids) ? 0 : addHeapObject(specific_key_ids), with_revision, with_balance, is_proof_subset, isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(offset) ? 0xFFFFFF : offset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityKeysByIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyIdentityNonceResult}
 */
export function verifyIdentityNonce(proof, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityNonce(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityNonceResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyIdentityRevisionForIdentityIdResult}
 */
export function verifyIdentityRevisionForIdentityId(proof, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityRevisionForIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityRevisionForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} contract_js
 * @param {string} document_type_name
 * @param {any} where_clauses
 * @param {any} order_by
 * @param {number | null | undefined} limit
 * @param {number | null | undefined} offset
 * @param {Uint8Array | null | undefined} start_at
 * @param {boolean} start_at_included
 * @param {bigint | null | undefined} block_time_ms
 * @param {number} platform_version_number
 * @returns {VerifyDocumentProofResult}
 */
export function verifyDocumentProof(proof, contract_js, document_type_name, where_clauses, order_by, limit, offset, start_at, start_at_included, block_time_ms, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        wasm.verifyDocumentProof(retptr, addBorrowedObject(proof), addBorrowedObject(contract_js), ptr0, len0, addBorrowedObject(where_clauses), addBorrowedObject(order_by), isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(offset) ? 0xFFFFFF : offset, isLikeNone(start_at) ? 0 : addHeapObject(start_at), start_at_included, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? BigInt(0) : block_time_ms, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyDocumentProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} contract_js
 * @param {string} document_type_name
 * @param {any} where_clauses
 * @param {any} order_by
 * @param {number | null | undefined} limit
 * @param {number | null | undefined} offset
 * @param {Uint8Array | null | undefined} start_at
 * @param {boolean} start_at_included
 * @param {bigint | null | undefined} block_time_ms
 * @param {number} platform_version_number
 * @returns {VerifyDocumentProofKeepSerializedResult}
 */
export function verifyDocumentProofKeepSerialized(proof, contract_js, document_type_name, where_clauses, order_by, limit, offset, start_at, start_at_included, block_time_ms, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        wasm.verifyDocumentProofKeepSerialized(retptr, addBorrowedObject(proof), addBorrowedObject(contract_js), ptr0, len0, addBorrowedObject(where_clauses), addBorrowedObject(order_by), isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(offset) ? 0xFFFFFF : offset, isLikeNone(start_at) ? 0 : addHeapObject(start_at), start_at_included, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? BigInt(0) : block_time_ms, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyDocumentProofKeepSerializedResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} contract_js
 * @param {string} document_type_name
 * @param {any} where_clauses
 * @param {any} order_by
 * @param {number | null | undefined} limit
 * @param {number | null | undefined} offset
 * @param {Uint8Array | null | undefined} start_at
 * @param {boolean} start_at_included
 * @param {bigint | null | undefined} block_time_ms
 * @param {boolean} is_proof_subset
 * @param {Uint8Array} document_id
 * @param {number} platform_version_number
 * @returns {VerifyStartAtDocumentInProofResult}
 */
export function verifyStartAtDocumentInProof(proof, contract_js, document_type_name, where_clauses, order_by, limit, offset, start_at, start_at_included, block_time_ms, is_proof_subset, document_id, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        wasm.verifyStartAtDocumentInProof(retptr, addBorrowedObject(proof), addBorrowedObject(contract_js), ptr0, len0, addBorrowedObject(where_clauses), addBorrowedObject(order_by), isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(offset) ? 0xFFFFFF : offset, isLikeNone(start_at) ? 0 : addHeapObject(start_at), start_at_included, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? BigInt(0) : block_time_ms, is_proof_subset, addBorrowedObject(document_id), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyStartAtDocumentInProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * Verify a single document proof and keep it serialized
 * @param {SingleDocumentDriveQueryWasm} query
 * @param {boolean} is_subset
 * @param {Uint8Array} proof
 * @param {number} platform_version_number
 * @returns {SingleDocumentProofResult}
 */
export function verifySingleDocumentProofKeepSerialized(query, is_subset, proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(query, SingleDocumentDriveQueryWasm);
        const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        wasm.verifySingleDocumentProofKeepSerialized(retptr, query.__wbg_ptr, is_subset, ptr0, len0, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return SingleDocumentProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Create a SingleDocumentDriveQuery for a non-contested document
 * @param {Uint8Array} contract_id
 * @param {string} document_type_name
 * @param {boolean} document_type_keeps_history
 * @param {Uint8Array} document_id
 * @param {number | null} [block_time_ms]
 * @returns {SingleDocumentDriveQueryWasm}
 */
export function createSingleDocumentQuery(contract_id, document_type_name, document_type_keeps_history, document_id, block_time_ms) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(contract_id, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(document_id, wasm.__wbindgen_export_2);
        const len2 = WASM_VECTOR_LEN;
        wasm.createSingleDocumentQuery(retptr, ptr0, len0, ptr1, len1, document_type_keeps_history, ptr2, len2, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? 0 : block_time_ms);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return SingleDocumentDriveQueryWasm.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Create a SingleDocumentDriveQuery for a maybe contested document
 * @param {Uint8Array} contract_id
 * @param {string} document_type_name
 * @param {boolean} document_type_keeps_history
 * @param {Uint8Array} document_id
 * @param {number | null} [block_time_ms]
 * @returns {SingleDocumentDriveQueryWasm}
 */
export function createSingleDocumentQueryMaybeContested(contract_id, document_type_name, document_type_keeps_history, document_id, block_time_ms) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(contract_id, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(document_id, wasm.__wbindgen_export_2);
        const len2 = WASM_VECTOR_LEN;
        wasm.createSingleDocumentQueryMaybeContested(retptr, ptr0, len0, ptr1, len1, document_type_keeps_history, ptr2, len2, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? 0 : block_time_ms);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return SingleDocumentDriveQueryWasm.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Create a SingleDocumentDriveQuery for a contested document
 * @param {Uint8Array} contract_id
 * @param {string} document_type_name
 * @param {boolean} document_type_keeps_history
 * @param {Uint8Array} document_id
 * @param {number | null} [block_time_ms]
 * @returns {SingleDocumentDriveQueryWasm}
 */
export function createSingleDocumentQueryContested(contract_id, document_type_name, document_type_keeps_history, document_id, block_time_ms) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(contract_id, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(document_id, wasm.__wbindgen_export_2);
        const len2 = WASM_VECTOR_LEN;
        wasm.createSingleDocumentQueryContested(retptr, ptr0, len0, ptr1, len1, document_type_keeps_history, ptr2, len2, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? 0 : block_time_ms);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return SingleDocumentDriveQueryWasm.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * @param {Uint8Array} proof
 * @param {boolean | null | undefined} contract_known_keeps_history
 * @param {boolean} is_proof_subset
 * @param {boolean} in_multiple_contract_proof_form
 * @param {Uint8Array} contract_id
 * @param {number} platform_version_number
 * @returns {VerifyContractResult}
 */
export function verifyContract(proof, contract_known_keeps_history, is_proof_subset, in_multiple_contract_proof_form, contract_id, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyContract(retptr, addBorrowedObject(proof), isLikeNone(contract_known_keeps_history) ? 0xFFFFFF : contract_known_keeps_history ? 1 : 0, is_proof_subset, in_multiple_contract_proof_form, addBorrowedObject(contract_id), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyContractResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {bigint} start_at_date
 * @param {number | null | undefined} limit
 * @param {number | null | undefined} offset
 * @param {number} platform_version_number
 * @returns {VerifyContractHistoryResult}
 */
export function verifyContractHistory(proof, contract_id, start_at_date, limit, offset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyContractHistory(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), start_at_date, isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(offset) ? 0xFFFFFF : offset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyContractHistoryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenBalancesForIdentityIdResult}
 */
export function verifyTokenBalancesForIdentityIdVec(proof, token_ids, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenBalancesForIdentityIdVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenBalancesForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenBalancesForIdentityIdResult}
 */
export function verifyTokenBalancesForIdentityIdMap(proof, token_ids, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenBalancesForIdentityIdMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenBalancesForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyTokenBalancesForIdentityIdsResult}
 */
export function verifyTokenBalancesForIdentityIdsVec(proof, token_id, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenBalancesForIdentityIdsVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenBalancesForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyTokenBalancesForIdentityIdsResult}
 */
export function verifyTokenBalancesForIdentityIdsMap(proof, token_id, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenBalancesForIdentityIdsMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenBalancesForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenDirectSellingPricesResult}
 */
export function verifyTokenDirectSellingPricesVec(proof, token_ids, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenDirectSellingPricesVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenDirectSellingPricesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenDirectSellingPricesResult}
 */
export function verifyTokenDirectSellingPricesMap(proof, token_ids, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenDirectSellingPricesMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenDirectSellingPricesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenInfosForIdentityIdResult}
 */
export function verifyTokenInfosForIdentityIdVec(proof, token_ids, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenInfosForIdentityIdVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenInfosForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenInfosForIdentityIdResult}
 */
export function verifyTokenInfosForIdentityIdMap(proof, token_ids, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenInfosForIdentityIdMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenInfosForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyTokenInfosForIdentityIdsResult}
 */
export function verifyTokenInfosForIdentityIdsVec(proof, token_id, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenInfosForIdentityIdsVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenInfosForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} is_proof_subset
 * @param {any} identity_ids
 * @param {number} platform_version_number
 * @returns {VerifyTokenInfosForIdentityIdsResult}
 */
export function verifyTokenInfosForIdentityIdsMap(proof, token_id, is_proof_subset, identity_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenInfosForIdentityIdsMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), is_proof_subset, addBorrowedObject(identity_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenInfosForIdentityIdsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {bigint | null | undefined} start_at_timestamp
 * @param {Uint8Array | null | undefined} start_at_identity_id
 * @param {number | null | undefined} limit
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenPreProgrammedDistributionsResult}
 */
export function verifyTokenPreProgrammedDistributionsVec(proof, token_id, start_at_timestamp, start_at_identity_id, limit, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenPreProgrammedDistributionsVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), !isLikeNone(start_at_timestamp), isLikeNone(start_at_timestamp) ? BigInt(0) : start_at_timestamp, isLikeNone(start_at_identity_id) ? 0 : addHeapObject(start_at_identity_id), isLikeNone(limit) ? 0xFFFFFF : limit, verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenPreProgrammedDistributionsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {bigint | null | undefined} start_at_timestamp
 * @param {Uint8Array | null | undefined} start_at_identity_id
 * @param {number | null | undefined} limit
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenPreProgrammedDistributionsResult}
 */
export function verifyTokenPreProgrammedDistributionsMap(proof, token_id, start_at_timestamp, start_at_identity_id, limit, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenPreProgrammedDistributionsMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), !isLikeNone(start_at_timestamp), isLikeNone(start_at_timestamp) ? BigInt(0) : start_at_timestamp, isLikeNone(start_at_identity_id) ? 0 : addHeapObject(start_at_identity_id), isLikeNone(limit) ? 0xFFFFFF : limit, verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenPreProgrammedDistributionsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenStatusesResult}
 */
export function verifyTokenStatusesVec(proof, token_ids, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenStatusesVec(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenStatusesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {any} token_ids
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenStatusesResult}
 */
export function verifyTokenStatusesMap(proof, token_ids, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenStatusesMap(retptr, addBorrowedObject(proof), addBorrowedObject(token_ids), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenStatusesResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenBalanceForIdentityIdResult}
 */
export function verifyTokenBalanceForIdentityId(proof, token_id, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenBalanceForIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenBalanceForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenContractInfoResult}
 */
export function verifyTokenContractInfo(proof, token_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenContractInfo(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenContractInfoResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenDirectSellingPriceResult}
 */
export function verifyTokenDirectSellingPrice(proof, token_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenDirectSellingPrice(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenDirectSellingPriceResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {Uint8Array} identity_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenInfoForIdentityIdResult}
 */
export function verifyTokenInfoForIdentityId(proof, token_id, identity_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenInfoForIdentityId(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), addBorrowedObject(identity_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenInfoForIdentityIdResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {Uint8Array} identity_id
 * @param {any} distribution_type_js
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenPerpetualDistributionLastPaidTimeResult}
 */
export function verifyTokenPerpetualDistributionLastPaidTime(proof, token_id, identity_id, distribution_type_js, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenPerpetualDistributionLastPaidTime(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), addBorrowedObject(identity_id), addBorrowedObject(distribution_type_js), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenPerpetualDistributionLastPaidTimeResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenStatusResult}
 */
export function verifyTokenStatus(proof, token_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenStatus(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenStatusResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} token_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult}
 */
export function verifyTokenTotalSupplyAndAggregatedIdentityBalance(proof, token_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTokenTotalSupplyAndAggregatedIdentityBalance(retptr, addBorrowedObject(proof), addBorrowedObject(token_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify action signers and return as an array of [signer_id, power] pairs
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {number} action_status
 * @param {Uint8Array} action_id
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyActionSignersResult}
 */
export function verifyActionSignersVec(proof, contract_id, group_contract_position, action_status, action_id, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyActionSignersVec(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, action_status, addBorrowedObject(action_id), is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyActionSignersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify action signers and return as a map with signer_id as key
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {number} action_status
 * @param {Uint8Array} action_id
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyActionSignersResult}
 */
export function verifyActionSignersMap(proof, contract_id, group_contract_position, action_status, action_id, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyActionSignersMap(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, action_status, addBorrowedObject(action_id), is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyActionSignersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify action infos in contract and return as an array of [action_id, action] pairs
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {number} action_status
 * @param {Uint8Array | null | undefined} start_action_id
 * @param {boolean | null | undefined} start_at_included
 * @param {number | null | undefined} limit
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyActionInfosInContractResult}
 */
export function verifyActionInfosInContractVec(proof, contract_id, group_contract_position, action_status, start_action_id, start_at_included, limit, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyActionInfosInContractVec(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, action_status, isLikeNone(start_action_id) ? 0 : addHeapObject(start_action_id), isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, isLikeNone(limit) ? 0xFFFFFF : limit, is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyActionInfosInContractResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify action infos in contract and return as a map with action_id as key
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {number} action_status
 * @param {Uint8Array | null | undefined} start_action_id
 * @param {boolean | null | undefined} start_at_included
 * @param {number | null | undefined} limit
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyActionInfosInContractResult}
 */
export function verifyActionInfosInContractMap(proof, contract_id, group_contract_position, action_status, start_action_id, start_at_included, limit, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyActionInfosInContractMap(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, action_status, isLikeNone(start_action_id) ? 0 : addHeapObject(start_action_id), isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, isLikeNone(limit) ? 0xFFFFFF : limit, is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyActionInfosInContractResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify group infos in contract and return as an array of [position, group] pairs
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number | null | undefined} start_group_contract_position
 * @param {boolean | null | undefined} start_at_included
 * @param {number | null | undefined} limit
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyGroupInfosInContractResult}
 */
export function verifyGroupInfosInContractVec(proof, contract_id, start_group_contract_position, start_at_included, limit, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyGroupInfosInContractVec(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), isLikeNone(start_group_contract_position) ? 0xFFFFFF : start_group_contract_position, isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, isLikeNone(limit) ? 0xFFFFFF : limit, is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyGroupInfosInContractResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * Verify group infos in contract and return as a map with position as key
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number | null | undefined} start_group_contract_position
 * @param {boolean | null | undefined} start_at_included
 * @param {number | null | undefined} limit
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyGroupInfosInContractResult}
 */
export function verifyGroupInfosInContractMap(proof, contract_id, start_group_contract_position, start_at_included, limit, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyGroupInfosInContractMap(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), isLikeNone(start_group_contract_position) ? 0xFFFFFF : start_group_contract_position, isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, isLikeNone(limit) ? 0xFFFFFF : limit, is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyGroupInfosInContractResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {number | null | undefined} action_status
 * @param {Uint8Array} action_id
 * @param {Uint8Array} action_signer_id
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyActionSignersTotalPowerResult}
 */
export function verifyActionSignersTotalPower(proof, contract_id, group_contract_position, action_status, action_id, action_signer_id, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyActionSignersTotalPower(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, isLikeNone(action_status) ? 0xFFFFFF : action_status, addBorrowedObject(action_id), addBorrowedObject(action_signer_id), is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyActionSignersTotalPowerResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {boolean} is_proof_subset
 * @param {number} platform_version_number
 * @returns {VerifyGroupInfoResult}
 */
export function verifyGroupInfo(proof, contract_id, group_contract_position, is_proof_subset, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyGroupInfo(retptr, addBorrowedObject(proof), addBorrowedObject(contract_id), group_contract_position, is_proof_subset, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyGroupInfoResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} query_cbor
 * @param {any} contract_lookup
 * @param {number} platform_version_number
 * @returns {VerifyIdentityVotesGivenProofResult}
 */
export function verifyIdentityVotesGivenProofVec(proof, query_cbor, contract_lookup, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityVotesGivenProofVec(retptr, addBorrowedObject(proof), addBorrowedObject(query_cbor), addBorrowedObject(contract_lookup), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityVotesGivenProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} query_cbor
 * @param {any} contract_lookup
 * @param {number} platform_version_number
 * @returns {VerifyIdentityVotesGivenProofResult}
 */
export function verifyIdentityVotesGivenProofMap(proof, query_cbor, contract_lookup, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyIdentityVotesGivenProofMap(retptr, addBorrowedObject(proof), addBorrowedObject(query_cbor), addBorrowedObject(contract_lookup), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyIdentityVotesGivenProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} query_cbor
 * @param {number} platform_version_number
 * @returns {VerifyVotePollsEndDateQueryResult}
 */
export function verifyVotePollsEndDateQueryVec(proof, query_cbor, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyVotePollsEndDateQueryVec(retptr, addBorrowedObject(proof), addBorrowedObject(query_cbor), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyVotePollsEndDateQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} query_cbor
 * @param {number} platform_version_number
 * @returns {VerifyVotePollsEndDateQueryResult}
 */
export function verifyVotePollsEndDateQueryMap(proof, query_cbor, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyVotePollsEndDateQueryMap(retptr, addBorrowedObject(proof), addBorrowedObject(query_cbor), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyVotePollsEndDateQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_cbor
 * @param {string} document_type_name
 * @param {string} index_name
 * @param {Uint8Array | null | undefined} start_at_value
 * @param {Array<any> | null | undefined} start_index_values
 * @param {Array<any> | null | undefined} end_index_values
 * @param {number | null | undefined} limit
 * @param {boolean} order_ascending
 * @param {number} platform_version_number
 * @returns {VerifyContestsProofResult}
 */
export function verifyContestsProof(proof, contract_cbor, document_type_name, index_name, start_at_value, start_index_values, end_index_values, limit, order_ascending, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(index_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        wasm.verifyContestsProof(retptr, addBorrowedObject(proof), addBorrowedObject(contract_cbor), ptr0, len0, ptr1, len1, isLikeNone(start_at_value) ? 0 : addHeapObject(start_at_value), isLikeNone(start_index_values) ? 0 : addHeapObject(start_index_values), isLikeNone(end_index_values) ? 0 : addHeapObject(end_index_values), isLikeNone(limit) ? 0xFFFFFF : limit, order_ascending, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyContestsProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} masternode_pro_tx_hash
 * @param {Uint8Array} vote_cbor
 * @param {Uint8Array} data_contract_cbor
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifyMasternodeVoteResult}
 */
export function verifyMasternodeVote(proof, masternode_pro_tx_hash, vote_cbor, data_contract_cbor, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyMasternodeVote(retptr, addBorrowedObject(proof), addBorrowedObject(masternode_pro_tx_hash), addBorrowedObject(vote_cbor), addBorrowedObject(data_contract_cbor), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyMasternodeVoteResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} specialized_balance_id
 * @param {boolean} verify_subset_of_proof
 * @param {number} platform_version_number
 * @returns {VerifySpecializedBalanceResult}
 */
export function verifySpecializedBalance(proof, specialized_balance_id, verify_subset_of_proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifySpecializedBalance(retptr, addBorrowedObject(proof), addBorrowedObject(specialized_balance_id), verify_subset_of_proof, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifySpecializedBalanceResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_cbor
 * @param {string} document_type_name
 * @param {string} index_name
 * @param {Uint8Array} contested_document_resource_vote_poll_bytes
 * @param {string} result_type
 * @param {boolean} allow_include_locked_and_abstaining_vote_tally
 * @param {number} platform_version_number
 * @returns {VerifyVotePollVoteStateProofResult}
 */
export function verifyVotePollVoteStateProof(proof, contract_cbor, document_type_name, index_name, contested_document_resource_vote_poll_bytes, result_type, allow_include_locked_and_abstaining_vote_tally, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(index_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(result_type, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len2 = WASM_VECTOR_LEN;
        wasm.verifyVotePollVoteStateProof(retptr, addBorrowedObject(proof), addBorrowedObject(contract_cbor), ptr0, len0, ptr1, len1, addBorrowedObject(contested_document_resource_vote_poll_bytes), ptr2, len2, allow_include_locked_and_abstaining_vote_tally, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyVotePollVoteStateProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array} contract_cbor
 * @param {string} document_type_name
 * @param {string} index_name
 * @param {Uint8Array} contestant_id
 * @param {Uint8Array} contested_document_resource_vote_poll_bytes
 * @param {Uint8Array | null | undefined} start_at
 * @param {number | null | undefined} limit
 * @param {boolean} order_ascending
 * @param {number} platform_version_number
 * @returns {VerifyVotePollVotesProofResult}
 */
export function verifyVotePollVotesProof(proof, contract_cbor, document_type_name, index_name, contestant_id, contested_document_resource_vote_poll_bytes, start_at, limit, order_ascending, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(index_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        wasm.verifyVotePollVotesProof(retptr, addBorrowedObject(proof), addBorrowedObject(contract_cbor), ptr0, len0, ptr1, len1, addBorrowedObject(contestant_id), addBorrowedObject(contested_document_resource_vote_poll_bytes), isLikeNone(start_at) ? 0 : addHeapObject(start_at), isLikeNone(limit) ? 0xFFFFFF : limit, order_ascending, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyVotePollVotesProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

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
 * @param {Uint8Array} _proof
 * @param {Array<any>} _path
 * @param {Array<any>} _keys
 * @param {number} _platform_version_number
 * @returns {VerifyElementsResult}
 */
export function verifyElements(_proof, _path, _keys, _platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyElements(retptr, addBorrowedObject(_proof), addBorrowedObject(_path), addBorrowedObject(_keys), _platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyElementsResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} current_epoch
 * @param {number | null | undefined} start_epoch
 * @param {number} count
 * @param {boolean} ascending
 * @param {number} platform_version_number
 * @returns {VerifyEpochInfosResult}
 */
export function verifyEpochInfos(proof, current_epoch, start_epoch, count, ascending, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyEpochInfos(retptr, addBorrowedObject(proof), current_epoch, isLikeNone(start_epoch) ? 0xFFFFFF : start_epoch, count, ascending, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyEpochInfosResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} epoch_index
 * @param {number | null | undefined} limit
 * @param {Uint8Array | null | undefined} start_at_proposer_id
 * @param {boolean | null | undefined} start_at_included
 * @param {number} platform_version_number
 * @returns {VerifyEpochProposersResult}
 */
export function verifyEpochProposersByRangeVec(proof, epoch_index, limit, start_at_proposer_id, start_at_included, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyEpochProposersByRangeVec(retptr, addBorrowedObject(proof), epoch_index, isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(start_at_proposer_id) ? 0 : addHeapObject(start_at_proposer_id), isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyEpochProposersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} epoch_index
 * @param {number | null | undefined} limit
 * @param {Uint8Array | null | undefined} start_at_proposer_id
 * @param {boolean | null | undefined} start_at_included
 * @param {number} platform_version_number
 * @returns {VerifyEpochProposersResult}
 */
export function verifyEpochProposersByRangeMap(proof, epoch_index, limit, start_at_proposer_id, start_at_included, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyEpochProposersByRangeMap(retptr, addBorrowedObject(proof), epoch_index, isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(start_at_proposer_id) ? 0 : addHeapObject(start_at_proposer_id), isLikeNone(start_at_included) ? 0xFFFFFF : start_at_included ? 1 : 0, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyEpochProposersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} epoch_index
 * @param {any} proposer_ids
 * @param {number} platform_version_number
 * @returns {VerifyEpochProposersResult}
 */
export function verifyEpochProposersByIdsVec(proof, epoch_index, proposer_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyEpochProposersByIdsVec(retptr, addBorrowedObject(proof), epoch_index, addBorrowedObject(proposer_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyEpochProposersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} epoch_index
 * @param {any} proposer_ids
 * @param {number} platform_version_number
 * @returns {VerifyEpochProposersResult}
 */
export function verifyEpochProposersByIdsMap(proof, epoch_index, proposer_ids, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyEpochProposersByIdsMap(retptr, addBorrowedObject(proof), epoch_index, addBorrowedObject(proposer_ids), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyEpochProposersResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} core_subsidy_halving_interval
 * @param {number} activation_core_height
 * @param {number} current_core_height
 * @param {number} platform_version_number
 * @returns {VerifyTotalCreditsInSystemResult}
 */
export function verifyTotalCreditsInSystem(proof, core_subsidy_halving_interval, activation_core_height, current_core_height, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyTotalCreditsInSystem(retptr, addBorrowedObject(proof), core_subsidy_halving_interval, activation_core_height, current_core_height, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyTotalCreditsInSystemResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {number} platform_version_number
 * @returns {VerifyUpgradeStateResult}
 */
export function verifyUpgradeState(proof, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyUpgradeState(retptr, addBorrowedObject(proof), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyUpgradeStateResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} proof
 * @param {Uint8Array | null | undefined} start_protx_hash
 * @param {number} count
 * @param {number} platform_version_number
 * @returns {VerifyUpgradeVoteStatusResult}
 */
export function verifyUpgradeVoteStatus(proof, start_protx_hash, count, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyUpgradeVoteStatus(retptr, addBorrowedObject(proof), isLikeNone(start_protx_hash) ? 0 : addHeapObject(start_protx_hash), count, platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyUpgradeVoteStatusResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {any} token_transition_js
 * @param {any} contract_js
 * @param {Uint8Array} owner_id
 * @param {number} platform_version_number
 * @returns {TokenTransitionPathQueryResult}
 */
export function tokenTransitionIntoPathQuery(token_transition_js, contract_js, owner_id, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.tokenTransitionIntoPathQuery(retptr, addBorrowedObject(token_transition_js), addBorrowedObject(contract_js), addBorrowedObject(owner_id), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} token_id
 * @param {Uint8Array} identity_id
 * @returns {TokenTransitionPathQueryResult}
 */
export function tokenBalanceForIdentityIdQuery(token_id, identity_id) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.tokenBalanceForIdentityIdQuery(retptr, addBorrowedObject(token_id), addBorrowedObject(identity_id));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} token_id
 * @param {any} identity_ids_js
 * @returns {TokenTransitionPathQueryResult}
 */
export function tokenBalancesForIdentityIdsQuery(token_id, identity_ids_js) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.tokenBalancesForIdentityIdsQuery(retptr, addBorrowedObject(token_id), addBorrowedObject(identity_ids_js));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} token_id
 * @param {Uint8Array} identity_id
 * @returns {TokenTransitionPathQueryResult}
 */
export function tokenInfoForIdentityIdQuery(token_id, identity_id) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.tokenInfoForIdentityIdQuery(retptr, addBorrowedObject(token_id), addBorrowedObject(identity_id));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} token_id
 * @returns {TokenTransitionPathQueryResult}
 */
export function tokenDirectPurchasePriceQuery(token_id) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.tokenDirectPurchasePriceQuery(retptr, addBorrowedObject(token_id));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {Uint8Array} contract_id
 * @param {number} group_contract_position
 * @param {Uint8Array} action_id
 * @param {Uint8Array} identity_id
 * @returns {TokenTransitionPathQueryResult}
 */
export function groupActiveAndClosedActionSingleSignerQuery(contract_id, group_contract_position, action_id, identity_id) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.groupActiveAndClosedActionSingleSignerQuery(retptr, addBorrowedObject(contract_id), group_contract_position, addBorrowedObject(action_id), addBorrowedObject(identity_id));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return TokenTransitionPathQueryResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
 * @param {any} state_transition_js
 * @param {bigint} block_height
 * @param {bigint} block_time_ms
 * @param {number} block_core_height
 * @param {Uint8Array} proof
 * @param {any} known_contracts_js
 * @param {number} platform_version_number
 * @returns {VerifyStateTransitionWasExecutedWithProofResult}
 */
export function verifyStateTransitionWasExecutedWithProof(state_transition_js, block_height, block_time_ms, block_core_height, proof, known_contracts_js, platform_version_number) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.verifyStateTransitionWasExecutedWithProof(retptr, addBorrowedObject(state_transition_js), block_height, block_time_ms, block_core_height, addBorrowedObject(proof), addBorrowedObject(known_contracts_js), platform_version_number);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeObject(r1);
        }
        return VerifyStateTransitionWasExecutedWithProofResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

export function main() {
    wasm.main();
}

const SingleDocumentDriveQueryWasmFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_singledocumentdrivequerywasm_free(ptr >>> 0, 1));
/**
 * WASM wrapper for SingleDocumentDriveQuery
 */
export class SingleDocumentDriveQueryWasm {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SingleDocumentDriveQueryWasm.prototype);
        obj.__wbg_ptr = ptr;
        SingleDocumentDriveQueryWasmFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SingleDocumentDriveQueryWasmFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_singledocumentdrivequerywasm_free(ptr, 0);
    }
    /**
     * Create a new SingleDocumentDriveQuery
     * @param {Uint8Array} contract_id
     * @param {string} document_type_name
     * @param {boolean} document_type_keeps_history
     * @param {Uint8Array} document_id
     * @param {number | null | undefined} block_time_ms
     * @param {number} contested_status
     */
    constructor(contract_id, document_type_name, document_type_keeps_history, document_id, block_time_ms, contested_status) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(contract_id, wasm.__wbindgen_export_2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(document_type_name, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArray8ToWasm0(document_id, wasm.__wbindgen_export_2);
            const len2 = WASM_VECTOR_LEN;
            wasm.singledocumentdrivequerywasm_new(retptr, ptr0, len0, ptr1, len1, document_type_keeps_history, ptr2, len2, !isLikeNone(block_time_ms), isLikeNone(block_time_ms) ? 0 : block_time_ms, contested_status);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            SingleDocumentDriveQueryWasmFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the contract ID
     * @returns {Uint8Array}
     */
    get contractId() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentdrivequerywasm_contractId(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the document type name
     * @returns {string}
     */
    get documentTypeName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentdrivequerywasm_documentTypeName(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_1(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get whether the document type keeps history
     * @returns {boolean}
     */
    get documentTypeKeepsHistory() {
        const ret = wasm.singledocumentdrivequerywasm_documentTypeKeepsHistory(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Get the document ID
     * @returns {Uint8Array}
     */
    get documentId() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentdrivequerywasm_documentId(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the block time in milliseconds
     * @returns {number | undefined}
     */
    get blockTimeMs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentdrivequerywasm_blockTimeMs(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the contested status
     * @returns {number}
     */
    get contestedStatus() {
        const ret = wasm.singledocumentdrivequerywasm_contestedStatus(this.__wbg_ptr);
        return ret;
    }
}

const SingleDocumentProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_singledocumentproofresult_free(ptr >>> 0, 1));
/**
 * Result of a single document proof verification
 */
export class SingleDocumentProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SingleDocumentProofResult.prototype);
        obj.__wbg_ptr = ptr;
        SingleDocumentProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SingleDocumentProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_singledocumentproofresult_free(ptr, 0);
    }
    /**
     * Get the root hash
     * @returns {Uint8Array}
     */
    get rootHash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_rootHash(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the serialized document (if found)
     * @returns {Uint8Array | undefined}
     */
    get documentSerialized() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_documentSerialized(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Check if a document was found
     * @returns {boolean}
     */
    hasDocument() {
        const ret = wasm.singledocumentproofresult_hasDocument(this.__wbg_ptr);
        return ret !== 0;
    }
}

const TokenTransitionPathQueryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tokentransitionpathqueryresult_free(ptr >>> 0, 1));

export class TokenTransitionPathQueryResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TokenTransitionPathQueryResult.prototype);
        obj.__wbg_ptr = ptr;
        TokenTransitionPathQueryResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TokenTransitionPathQueryResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tokentransitionpathqueryresult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get path_query() {
        const ret = wasm.tokentransitionpathqueryresult_path_query(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyActionInfosInContractResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyactioninfosincontractresult_free(ptr >>> 0, 1));

export class VerifyActionInfosInContractResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyActionInfosInContractResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyActionInfosInContractResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyActionInfosInContractResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyactioninfosincontractresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get actions() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyActionSignersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyactionsignersresult_free(ptr >>> 0, 1));

export class VerifyActionSignersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyActionSignersResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyActionSignersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyActionSignersResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyactionsignersresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get signers() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyActionSignersTotalPowerResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyactionsignerstotalpowerresult_free(ptr >>> 0, 1));

export class VerifyActionSignersTotalPowerResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyActionSignersTotalPowerResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyActionSignersTotalPowerResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyActionSignersTotalPowerResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyactionsignerstotalpowerresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactionsignerstotalpowerresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {number}
     */
    get action_status() {
        const ret = wasm.verifyactionsignerstotalpowerresult_action_status(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {bigint}
     */
    get total_power() {
        const ret = wasm.verifyactionsignerstotalpowerresult_total_power(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}

const VerifyContestsProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifycontestsproofresult_free(ptr >>> 0, 1));

export class VerifyContestsProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyContestsProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyContestsProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyContestsProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifycontestsproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontestsproofresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Array<any>}
     */
    get contests() {
        const ret = wasm.verifycontestsproofresult_contests(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyContractHistoryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifycontracthistoryresult_free(ptr >>> 0, 1));

export class VerifyContractHistoryResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyContractHistoryResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyContractHistoryResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyContractHistoryResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifycontracthistoryresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get contract_history() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyContractResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifycontractresult_free(ptr >>> 0, 1));

export class VerifyContractResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyContractResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyContractResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyContractResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifycontractresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    get contract() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_documentSerialized(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyDocumentProofKeepSerializedResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifydocumentproofkeepserializedresult_free(ptr >>> 0, 1));

export class VerifyDocumentProofKeepSerializedResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyDocumentProofKeepSerializedResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyDocumentProofKeepSerializedResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyDocumentProofKeepSerializedResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifydocumentproofkeepserializedresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get serialized_documents() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyDocumentProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifydocumentproofresult_free(ptr >>> 0, 1));

export class VerifyDocumentProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyDocumentProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyDocumentProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyDocumentProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifydocumentproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get documents() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyElementsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyelementsresult_free(ptr >>> 0, 1));

export class VerifyElementsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyElementsResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyElementsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyElementsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyelementsresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get elements() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyEpochInfosResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyepochinfosresult_free(ptr >>> 0, 1));

export class VerifyEpochInfosResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyEpochInfosResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyEpochInfosResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyEpochInfosResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyepochinfosresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get epoch_infos() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyEpochProposersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyepochproposersresult_free(ptr >>> 0, 1));

export class VerifyEpochProposersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyEpochProposersResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyEpochProposersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyEpochProposersResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyepochproposersresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get proposers() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyFullIdentitiesByPublicKeyHashesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyfullidentitiesbypublickeyhashesresult_free(ptr >>> 0, 1));

export class VerifyFullIdentitiesByPublicKeyHashesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyFullIdentitiesByPublicKeyHashesResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyFullIdentitiesByPublicKeyHashesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyFullIdentitiesByPublicKeyHashesResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyfullidentitiesbypublickeyhashesresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identities() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyFullIdentityByIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyfullidentitybyidentityidresult_free(ptr >>> 0, 1));

export class VerifyFullIdentityByIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyFullIdentityByIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyFullIdentityByIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyFullIdentityByIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyfullidentitybyidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identity() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyFullIdentityByNonUniquePublicKeyHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyfullidentitybynonuniquepublickeyhashresult_free(ptr >>> 0, 1));

export class VerifyFullIdentityByNonUniquePublicKeyHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyFullIdentityByNonUniquePublicKeyHashResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyFullIdentityByNonUniquePublicKeyHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyFullIdentityByNonUniquePublicKeyHashResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyfullidentitybynonuniquepublickeyhashresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identity() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyFullIdentityByUniquePublicKeyHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyfullidentitybyuniquepublickeyhashresult_free(ptr >>> 0, 1));

export class VerifyFullIdentityByUniquePublicKeyHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyFullIdentityByUniquePublicKeyHashResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyFullIdentityByUniquePublicKeyHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyFullIdentityByUniquePublicKeyHashResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyfullidentitybyuniquepublickeyhashresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identity() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyGroupInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifygroupinforesult_free(ptr >>> 0, 1));

export class VerifyGroupInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyGroupInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyGroupInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyGroupInfoResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifygroupinforesult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get group() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyGroupInfosInContractResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifygroupinfosincontractresult_free(ptr >>> 0, 1));

export class VerifyGroupInfosInContractResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyGroupInfosInContractResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyGroupInfosInContractResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyGroupInfosInContractResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifygroupinfosincontractresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get groups() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyIdentitiesContractKeysResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitiescontractkeysresult_free(ptr >>> 0, 1));

export class VerifyIdentitiesContractKeysResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentitiesContractKeysResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentitiesContractKeysResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentitiesContractKeysResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitiescontractkeysresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get keys() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyIdentityBalanceAndRevisionForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitybalanceandrevisionforidentityidresult_free(ptr >>> 0, 1));

export class VerifyIdentityBalanceAndRevisionForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityBalanceAndRevisionForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityBalanceAndRevisionForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityBalanceAndRevisionForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitybalanceandrevisionforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceandrevisionforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get balance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceandrevisionforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {bigint | undefined}
     */
    get revision() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceandrevisionforidentityidresult_revision(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityBalanceForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitybalanceforidentityidresult_free(ptr >>> 0, 1));

export class VerifyIdentityBalanceForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityBalanceForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityBalanceForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityBalanceForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitybalanceforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get balance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityBalancesForIdentityIdsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitybalancesforidentityidsresult_free(ptr >>> 0, 1));

export class VerifyIdentityBalancesForIdentityIdsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityBalancesForIdentityIdsResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityBalancesForIdentityIdsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityBalancesForIdentityIdsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitybalancesforidentityidsresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get balances() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyIdentityContractNonceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitycontractnonceresult_free(ptr >>> 0, 1));

export class VerifyIdentityContractNonceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityContractNonceResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityContractNonceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityContractNonceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitycontractnonceresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get nonce() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityIdByNonUniquePublicKeyHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentityidbynonuniquepublickeyhashresult_free(ptr >>> 0, 1));

export class VerifyIdentityIdByNonUniquePublicKeyHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityIdByNonUniquePublicKeyHashResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityIdByNonUniquePublicKeyHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityIdByNonUniquePublicKeyHashResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentityidbynonuniquepublickeyhashresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    get identity_id() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_documentSerialized(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityIdByUniquePublicKeyHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentityidbyuniquepublickeyhashresult_free(ptr >>> 0, 1));

export class VerifyIdentityIdByUniquePublicKeyHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityIdByUniquePublicKeyHashResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityIdByUniquePublicKeyHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityIdByUniquePublicKeyHashResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentityidbyuniquepublickeyhashresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    get identity_id() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_documentSerialized(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityIdsByUniquePublicKeyHashesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentityidsbyuniquepublickeyhashesresult_free(ptr >>> 0, 1));

export class VerifyIdentityIdsByUniquePublicKeyHashesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityIdsByUniquePublicKeyHashesResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityIdsByUniquePublicKeyHashesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityIdsByUniquePublicKeyHashesResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentityidsbyuniquepublickeyhashesresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identity_ids() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyIdentityKeysByIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitykeysbyidentityidresult_free(ptr >>> 0, 1));

export class VerifyIdentityKeysByIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityKeysByIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityKeysByIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityKeysByIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitykeysbyidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get identity() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyIdentityNonceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentitynonceresult_free(ptr >>> 0, 1));

export class VerifyIdentityNonceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityNonceResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityNonceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityNonceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentitynonceresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get nonce() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityRevisionForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentityrevisionforidentityidresult_free(ptr >>> 0, 1));

export class VerifyIdentityRevisionForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityRevisionForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityRevisionForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityRevisionForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentityrevisionforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get revision() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyIdentityVotesGivenProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyidentityvotesgivenproofresult_free(ptr >>> 0, 1));

export class VerifyIdentityVotesGivenProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyIdentityVotesGivenProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyIdentityVotesGivenProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyIdentityVotesGivenProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyidentityvotesgivenproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get votes() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyMasternodeVoteResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifymasternodevoteresult_free(ptr >>> 0, 1));

export class VerifyMasternodeVoteResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyMasternodeVoteResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyMasternodeVoteResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyMasternodeVoteResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifymasternodevoteresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    get vote() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.singledocumentproofresult_documentSerialized(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export_1(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifySpecializedBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyspecializedbalanceresult_free(ptr >>> 0, 1));

export class VerifySpecializedBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifySpecializedBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifySpecializedBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifySpecializedBalanceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyspecializedbalanceresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get balance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyStartAtDocumentInProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifystartatdocumentinproofresult_free(ptr >>> 0, 1));

export class VerifyStartAtDocumentInProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyStartAtDocumentInProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyStartAtDocumentInProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyStartAtDocumentInProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifystartatdocumentinproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get document() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyStateTransitionWasExecutedWithProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifystatetransitionwasexecutedwithproofresult_free(ptr >>> 0, 1));

export class VerifyStateTransitionWasExecutedWithProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyStateTransitionWasExecutedWithProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyStateTransitionWasExecutedWithProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyStateTransitionWasExecutedWithProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifystatetransitionwasexecutedwithproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get proof_result() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenBalanceForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenbalanceforidentityidresult_free(ptr >>> 0, 1));

export class VerifyTokenBalanceForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenBalanceForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenBalanceForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenBalanceForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenbalanceforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyidentitybalanceforidentityidresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get balance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyidentitybalanceforidentityidresult_balance(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getBigInt64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : BigInt.asUintN(64, r2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const VerifyTokenBalancesForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenbalancesforidentityidresult_free(ptr >>> 0, 1));

export class VerifyTokenBalancesForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenBalancesForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenBalancesForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenBalancesForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenbalancesforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get balances() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenBalancesForIdentityIdsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenbalancesforidentityidsresult_free(ptr >>> 0, 1));

export class VerifyTokenBalancesForIdentityIdsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenBalancesForIdentityIdsResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenBalancesForIdentityIdsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenBalancesForIdentityIdsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenbalancesforidentityidsresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get balances() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenContractInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokencontractinforesult_free(ptr >>> 0, 1));

export class VerifyTokenContractInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenContractInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenContractInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenContractInfoResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokencontractinforesult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get contract_info() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenDirectSellingPriceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokendirectsellingpriceresult_free(ptr >>> 0, 1));

export class VerifyTokenDirectSellingPriceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenDirectSellingPriceResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenDirectSellingPriceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenDirectSellingPriceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokendirectsellingpriceresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get price() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenDirectSellingPricesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokendirectsellingpricesresult_free(ptr >>> 0, 1));

export class VerifyTokenDirectSellingPricesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenDirectSellingPricesResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenDirectSellingPricesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenDirectSellingPricesResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokendirectsellingpricesresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get prices() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenInfoForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokeninfoforidentityidresult_free(ptr >>> 0, 1));

export class VerifyTokenInfoForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenInfoForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenInfoForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenInfoForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokeninfoforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get token_info() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenInfosForIdentityIdResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokeninfosforidentityidresult_free(ptr >>> 0, 1));

export class VerifyTokenInfosForIdentityIdResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenInfosForIdentityIdResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenInfosForIdentityIdResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenInfosForIdentityIdResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokeninfosforidentityidresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get token_infos() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenInfosForIdentityIdsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokeninfosforidentityidsresult_free(ptr >>> 0, 1));

export class VerifyTokenInfosForIdentityIdsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenInfosForIdentityIdsResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenInfosForIdentityIdsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenInfosForIdentityIdsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokeninfosforidentityidsresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get token_infos() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenPerpetualDistributionLastPaidTimeResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenperpetualdistributionlastpaidtimeresult_free(ptr >>> 0, 1));

export class VerifyTokenPerpetualDistributionLastPaidTimeResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenPerpetualDistributionLastPaidTimeResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenPerpetualDistributionLastPaidTimeResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenPerpetualDistributionLastPaidTimeResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenperpetualdistributionlastpaidtimeresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get last_paid_time() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenPreProgrammedDistributionsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenpreprogrammeddistributionsresult_free(ptr >>> 0, 1));

export class VerifyTokenPreProgrammedDistributionsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenPreProgrammedDistributionsResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenPreProgrammedDistributionsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenPreProgrammedDistributionsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenpreprogrammeddistributionsresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get distributions() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenStatusResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenstatusresult_free(ptr >>> 0, 1));

export class VerifyTokenStatusResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenStatusResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenStatusResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenStatusResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenstatusresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get status() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenStatusesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokenstatusesresult_free(ptr >>> 0, 1));

export class VerifyTokenStatusesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenStatusesResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenStatusesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenStatusesResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokenstatusesresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get statuses() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytokentotalsupplyandaggregatedidentitybalanceresult_free(ptr >>> 0, 1));

export class VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTokenTotalSupplyAndAggregatedIdentityBalanceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytokentotalsupplyandaggregatedidentitybalanceresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get total_supply_and_balance() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyTotalCreditsInSystemResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifytotalcreditsinsystemresult_free(ptr >>> 0, 1));

export class VerifyTotalCreditsInSystemResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyTotalCreditsInSystemResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyTotalCreditsInSystemResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyTotalCreditsInSystemResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifytotalcreditsinsystemresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactionsignerstotalpowerresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {bigint}
     */
    get total_credits() {
        const ret = wasm.verifyactionsignerstotalpowerresult_total_power(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}

const VerifyUpgradeStateResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyupgradestateresult_free(ptr >>> 0, 1));

export class VerifyUpgradeStateResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyUpgradeStateResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyUpgradeStateResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyUpgradeStateResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyupgradestateresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get upgrade_state() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyUpgradeVoteStatusResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyupgradevotestatusresult_free(ptr >>> 0, 1));

export class VerifyUpgradeVoteStatusResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyUpgradeVoteStatusResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyUpgradeVoteStatusResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyUpgradeVoteStatusResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyupgradevotestatusresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get vote_status() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyVotePollVoteStateProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyvotepollvotestateproofresult_free(ptr >>> 0, 1));

export class VerifyVotePollVoteStateProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyVotePollVoteStateProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyVotePollVoteStateProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyVotePollVoteStateProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyvotepollvotestateproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get result() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyVotePollVotesProofResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyvotepollvotesproofresult_free(ptr >>> 0, 1));

export class VerifyVotePollVotesProofResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyVotePollVotesProofResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyVotePollVotesProofResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyVotePollVotesProofResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyvotepollvotesproofresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifycontestsproofresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Array<any>}
     */
    get votes() {
        const ret = wasm.verifycontestsproofresult_contests(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const VerifyVotePollsEndDateQueryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_verifyvotepollsenddatequeryresult_free(ptr >>> 0, 1));

export class VerifyVotePollsEndDateQueryResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyVotePollsEndDateQueryResult.prototype);
        obj.__wbg_ptr = ptr;
        VerifyVotePollsEndDateQueryResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VerifyVotePollsEndDateQueryResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyvotepollsenddatequeryresult_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get root_hash() {
        const ret = wasm.verifyactioninfosincontractresult_root_hash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    get vote_polls() {
        const ret = wasm.verifyactioninfosincontractresult_actions(this.__wbg_ptr);
        return takeObject(ret);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_done_769e5ede4b31c67b = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_entries_3265d4158b33e5dc = function(arg0) {
        const ret = Object.entries(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_export_1(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Map_f3469ce2244d2430 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Map;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Object_7f2dcef8f78644a4 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Object;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_343e2beeeece1bb0 = function(arg0) {
        const ret = Number.isSafeInteger(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_iterator_9a24c88df860dc65 = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_keys_5c77a08ddc2fb8a6 = function(arg0) {
        const ret = Object.keys(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_5e0be73521bc8c17 = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_25feadfc0913fea9 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_require_79b1e9274cde3c87 = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +getObject(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i128 = function(arg0, arg1) {
        const ret = arg0 << BigInt(64) | BigInt.asUintN(64, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_from_u128 = function(arg0, arg1) {
        const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = getObject(arg1);
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = getObject(arg0) in getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'bigint';
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = getObject(arg0) === getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }


    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
