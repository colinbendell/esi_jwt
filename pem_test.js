require('test.js');
require('pem.js');

printv(assertEqual("prepadSigned('ffff')", prepadSigned("ffff"), "00ffff"));
printv(assertEqual("prepadSigned('010001')", prepadSigned("010001"), "010001"));
printv(assertEqual("encodeLengthHex(16)", encodeLengthHex(16), "10"));
printv(assertEqual("encodeLengthHex(65535)", encodeLengthHex(65535), "82ffff"));
printv(assertEqual("encodeLengthHex(65535)", encodeLengthHex(65535), "82ffff"));
printv(assertEqual("formatPem('MIIBIjA...+pTdOQIDAQAB')",
    formatPem("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9jc7TbIST7FQQb1CkAunhGaOaqGk7B4sLmBGIgIxjhMWtn5EtoiQ1ZT6BYcWorCB2UkfOgFBB4TUZnYMDL2DOQIDAQAB"),
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9jc7TbIST7FQQb1CkAun\nhGaOaqGk7B4sLmBGIgIxjhMWtn5EtoiQ1ZT6BYcWorCB2UkfOgFBB4TUZnYMDL2D\nOQIDAQAB"));

let modulus = "iXn-WmrwLLBa-QDiToBozpu4Y4ThKdwORWFXQa9I75pKOvPUjUjE2Bk05TUSt7-V7KDjCq0_Nkd-X9rMRV5LKgCa0_F8YgI30QS3bUm9orFryrdOc65PUIVFVxIwMZuGDY1hj6HEJVWIr0CZdcgNIll06BasclckkUK4O-Eh7MaQrqb646ghFlG3zlgk9b2duHbDOq3s39ICPinRQWC6NqTYfqg7E8GN_NLY9srUCc_MswuUfMJ2cKT6edrhLuIwIj_74YGkpOwilr2VswKsvJ7dcoiJxheKYvKDKtZFkbKrWETTJSGX2Xeh0DFB0lqbKLVvqkM2lFU2Qx1OgtTnrw==";
let exponent = "AQAB";
let pem = "-----BEGIN PUBLIC KEY-----\n"
    + "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiXn+WmrwLLBa+QDiToBo\n"
    + "zpu4Y4ThKdwORWFXQa9I75pKOvPUjUjE2Bk05TUSt7+V7KDjCq0/Nkd+X9rMRV5L\n"
    + "KgCa0/F8YgI30QS3bUm9orFryrdOc65PUIVFVxIwMZuGDY1hj6HEJVWIr0CZdcgN\n"
    + "Ill06BasclckkUK4O+Eh7MaQrqb646ghFlG3zlgk9b2duHbDOq3s39ICPinRQWC6\n"
    + "NqTYfqg7E8GN/NLY9srUCc/MswuUfMJ2cKT6edrhLuIwIj/74YGkpOwilr2VswKs\n"
    + "vJ7dcoiJxheKYvKDKtZFkbKrWETTJSGX2Xeh0DFB0lqbKLVvqkM2lFU2Qx1OgtTn\n"
    + "rwIDAQAB\n"
    + "-----END PUBLIC KEY-----\n";
printv(assertEqual("rsaPublicKeyPem('iXn-WmrwL...Tnrw==', 'AQAB')", rsaPublicKeyPem(modulus, exponent),pem));
