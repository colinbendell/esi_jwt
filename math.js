/**
 * Logical rigth shift since ESI doesn't have support for <<<
 *
 * We are assuming 32bit integers.
 *
 * @param x the number you are shifting
 * @param n the number of bits to logically shift
 * @returns {number}
 */
function logical_right_shift(x, n) {
    let size = 4 * 8; // usually sizeof(int) is 4 bytes (32 bits)
    return (x >> n) & ~(((1 << size) >> n) << 1);
}

/**
 * The equivalent ot Math.pow(). This function is recursive
 *
 * @param n the source number
 * @param exp the
 * @returns {number}
 */
function power(n, exp) {
    let val = 1;
    if (exp > 1) {
        val = n*power(n, exp-1);
    }
    else if (exp == 1) {
        val = n;
    }

    return val;
}

/**
 * Convert an integer to an unpadded Base16 (hex) value. This is the same as x.toString(16)
 * @param val an integer
 * @param pad should we ensure that this is properly padded into a 32byte (2 character) group? Default is true but
 * we disable this for recursion
 * @returns {*} a base16 (hex) formatted value
 */
function toBase16(val, pad=true) {
    if (int(val) === 0) return "00";

    let ret = HEX_CHARS.charAt(val%16);
    val /= 16;

    if (val > 0) {
        ret = toBase16(val) + str(ret);
    }

    if (pad && nstr.length % 2 !== 0) return "0" + nstr;

    return str(ret);
}

const HEX_CHARS='0123456789abcdef';
function toBase10(hex) {
    if (is_empty(hex)) return 0;

    let c = index(HEX_CHARS, hex[0]);
    c *= power(16,hex.length-1);

    if (hex.length > 1) {
        c += toBase10(substr(hex, 1));
    }

    return c;
}



function toHex(number) {
//    let nstr = number.toString(16);
    let nstr = toBase16(number, true);
    if (nstr.length % 2 == 0) return nstr;
    return '0'+nstr;
}

const BASE64_CHARS =
    "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";
/**
 * convert a hext string input to base64 equivelant.
 * @param input is a hex (32 bit wide) input string
 * @returns {string} a base64 string representation of the same
 *
 * Sample sources:
 * https://stackoverflow.com/questions/18835132/xml-to-pem-in-node-js
 * https://ncona.com/2015/02/consuming-a-google-id-token-from-a-server/
 */
function hexToBase64(input) {
    let b64value = "";
    for(let i=0; i <= (input.length+5)/6-1; i++) {
        // do {
        // chr1 = input.charCodeAt(i++);
        // chr2 = input.charCodeAt(i++);
        // chr3 = input.charCodeAt(i++);
        let chr1 = toBase10(input[i*6 + 0] + input[i*6 + 1]);
        let chr2 = toBase10(input[i*6 + 2] + input[i*6 + 3]);
        let chr3 = toBase10(input[i*6 + 4] + input[i*6 + 5]);

        let enc1 = chr1 >> 2;
        let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        let enc4 = chr3 & 63;

//            if (isNaN(chr2)) {
        if (i*6+3 > input.length) {
            enc3 = 64;
            enc4 = enc3;
//        } else if (isNaN(chr3)) {
        } else if (i*6+5 > input.length) {
            enc4 = 64;
        }

        b64value += BASE64_CHARS.charAt(enc1)
            + BASE64_CHARS.charAt(enc2)
            + BASE64_CHARS.charAt(enc3)
            + BASE64_CHARS.charAt(enc4);

        // } while (i < input.length);
    }
    return(b64value);
}

/**
 * convert a base64 string input to hex notation. We do this because we can't necessarily trust the character encoding used by
 * base64_decode. Therefore we have to use our own base64_decode and convert
 * @param input is a base64 input string. We should probably force normalization ahead...
 * @returns {string} a base16 string representation of the same
 *
 * same as: `echo -n blablabla==|base64 --decode| hexdump -v -e '/1 "%02x" '`
 */
function base64toHex(input) {
    let output = "";

    if (input.indexOf('-') >=0 || input.indexOf('_') >= 0) {
        input = replace(replace(input, '-', '+'), '_', '/');
    }

//      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    for(let i=0; i <= (input.length+3)/4 - 1; i++) {
        let enc1 = BASE64_CHARS.indexOf(input.charAt(i*4+0));
        //enc2 = b64array.indexOf(input.charAt(i++));
        let enc2 = BASE64_CHARS.indexOf(input.charAt(i*4+1) || '=');
        //enc3 = b64array.indexOf(input.charAt(i++));
        let enc3 = BASE64_CHARS.indexOf(input.charAt(i*4+2) || '=');
        //enc4 = b64array.indexOf(input.charAt(i++));
        let enc4 = BASE64_CHARS.indexOf(input.charAt(i*4+3) || '=');

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        //output = output + String.fromCharCode(chr1);
        output += toHex(chr1);

        if (enc3 != 64) {
            //output = output + String.fromCharCode(chr2);
            output += toHex(chr2);
        }
        if (enc4 != 64) {
            //output = output + String.fromCharCode(chr3);
            output += toHex(chr3);
        }
    }
    return output;
}

/**
 * Not all Base64 encodings are made equal. This coerces a common Base64Url encoding to traditional Base64
 * https://en.wikipedia.org/wiki/Base64
 * @param input
 * @returns {*}
 */
function base64url_decode(input) {
    input = replace(replace(input, '-', '+'), '_', '/');
    if (input.length % 4 == 2) input += "==";
    if (input.length % 4 == 3) input += "=";
    return base64_decode(input);
}