require('math.js');

/**
 *
 * @param hexStr
 * @returns {*}
 */
function prepadSigned(hexStr) {
    let msb = HEX_CHARS.indexOf(hexStr.charAt(0));
    if (msb >= 8) {
        return '00'+hexStr;
    } else {
        return hexStr;
    }
}

// encode ASN.1 DER length field
// if <=127, short form
// if >=128, long form
function encodeLengthHex(n) {
    if (n<=127) return toHex(n);
    else {
        let n_hex = toHex(n);
        let length_of_length_byte = 128 + n_hex.length/2; // 0x80+numbytes
        return toHex(length_of_length_byte)+n_hex;
    }
}

/**
 * Add \n every 64 characters for proper formatting
 * @param value - pem value (without decorator)
 * @returns {*}
 */
function formatPem(value) {
    let returnValue = substr(value, 0, 64);
    if (value.length >= 64)
        returnValue += '\n' + formatPem(substr(value, 64));
    return returnValue;
}

/**
 *
 * @param modulus_b64
 * @param exponent_b64
 * @returns {string}
 */
function rsaPublicKeyPem(modulus_b64="00", exponent_b64="00") {

    //let modulus_hex = modulus.toString('hex')
    let modulus_hex = base64toHex(modulus_b64);
    //let exponent_hex = exponent.toString('hex')
    let exponent_hex = base64toHex(exponent_b64);

    modulus_hex = prepadSigned(modulus_hex);
    exponent_hex = prepadSigned(exponent_hex);

    let modlen = modulus_hex.length / 2;
    let explen = exponent_hex.length / 2;

    let encoded_modlen = encodeLengthHex(modlen);
    let encoded_explen = encodeLengthHex(explen);
    let encoded_pubkey = '30' +
        encodeLengthHex(
            modlen +
            explen +
            encoded_modlen.length / 2 +
            encoded_explen.length / 2 + 2
        ) +
        '02' + encoded_modlen + modulus_hex +
        '02' + encoded_explen + exponent_hex;

    let seq2 =
        '300d' +
        '06092a864886f70d010101' +
        '0500' +
        '03' + encodeLengthHex(encoded_pubkey.length/2 + 1) +
        '00' + encoded_pubkey;

    let der_hex = '30' + encodeLengthHex(seq2.length/2) + seq2;

    return '-----BEGIN PUBLIC KEY-----\n'
        + formatPem(hexToBase64(der_hex))
//        + der_b64.match(/.{1,64}/g).join('\n')
        + '\n-----END PUBLIC KEY-----\n';
}
