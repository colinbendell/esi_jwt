require('math.js');
require('pem.js');
require('jwt.js');

let googleConfigUrl = "https://accounts.google.com/.well-known/openid-configuration";
let altUrl = "/google-openid-configuration.json";
let xhrUrl = "/esi/xhr2json.html?name=openidConfig&url=" + url_encode(googleConfigUrl) + "&alt=" + url_encode(altUrl);
eval(src=xhrUrl, onError="continue");

let altUrl = "/google-jwks.json";
let xhrUrl = "/esi/xhr2json.html?name=jwks&url=" + url_encode(openidConfig["jwks_uri"]) + "&alt=" + url_encode(altUrl);
eval(src=xhrUrl, onError="continue");

function getVerifyUrl(url, jwt, jwks, setCookie=true) {
    jwt = parseJWT(jwt);

    let key = findCert(jwks.keys, jwt.kid);

    let modulus = key.n || "00";
    let exponent = key.e || "00";
    if (modulus == "00" || exponent == "00") return url;

    let pem = rsaPublicKeyPem(modulus, exponent);

    let pemUrlSafe = replace(pem, '\n', '\\n');

    if (setCookie) {
        add_header("Set-Cookie", "data=" + jwt.message + "; Path=/; Secure; Max-Age=30;");
        add_header("Set-Cookie", "sig=" + jwt.signature + "; Path=/; Secure; Max-Age=30;");
        add_header("Set-Cookie", "pem=" + pemUrlSafe + "; Path=/; Secure; Max-Age=30;");
    }
    else {
        url += "?data=" + jwt.message + "&sig=" + jwt.signature + "&pem=" + url_encode(pemUrlSafe);
    }
    return url;
}

let jwt = QUERY_STRING["access_token"] || "";
let url = QUERY_STRING["url"] || "/data/verify";

let verifyUrl = getVerifyUrl(url, jwt, jwks);
printv(set_redirect(verifyUrl));
printv(add_cachebusting_header());
