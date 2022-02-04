require('math.js');

function findCert(certs, kid = "") {
    let key = certs[0];
    if (key.kid == kid) {
        return key;
    }
    if (certs.length > 1) {
        list_delitem(certs, 0);
        return findCert(certs, kid);
    }

    return {};
}

function parseJWT(jwt) {
    let parts = string_split(jwt, '.');
    let header = base64url_decode(parts[0]);
    let payload = base64url_decode(parts[1]);
    let message = parts[0] + "." + parts[1];

    let signature = parts[2]; // don't need to base64 convert here
    if (signature.length % 4 == 2) signature += "==";
    if (signature.length % 4 == 3) signature += "=";

    // lame json parsing here...
    let items = string_split(header, '"');
    let kid = items[7] || items[5] || "";

    let jwtObject = {
        "token": jwt,
        "header": header,
        "payload": payload,
        "message": message,
        "kid": kid,
        "signature": signature
    };

    return(jwtObject);
}
