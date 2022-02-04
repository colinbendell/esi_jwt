require('test.js');
require('jwtvalidator.js');

let jwks_test = {
    "keys": [
        {
            "kty": "RSA",
            "alg": "RS256",
            "use": "sig",
            "kid": "70484949aa0a58ac391c3883ee2d3f62e93bf780",
            "n": "412CDT2txyBC1tEs5QEafP1mGgh2Q0c-oVP96WPuw2FiWVbEOsXu_hLoSP3hU75M0b832h6Tq13GijGsHLxIKzZrP1QQ6SRh3PCqY_ox_K-QjfFayqRsAsHkR2nEciOvrnTc5EbxOK1uXu8rbVEV8pFl6h_BZneClTcsehI_WYB--3fHDz9RDtJV97UIq2UdcafzaTFl76DLoWb4hQuNIby1ujXy_5tcJbZHpvSBEzq99AaRuSsYVmnYDNqDTu0qQOGKs55UeHKVpH5TrwX6CG2yitpePBcFbHhf5iOXUULFC8PBakgWGUGQTpKnpvevutRJ3ISoobIG61ANy-H3uQ==",
            "e": "AQAB"
        },
        {
            "kty": "RSA",
            "alg": "RS256",
            "use": "sig",
            "kid": "ca04df587b5a7cead80abee9ea8dcf7586a78e01",
            "n": "iXn-WmrwLLBa-QDiToBozpu4Y4ThKdwORWFXQa9I75pKOvPUjUjE2Bk05TUSt7-V7KDjCq0_Nkd-X9rMRV5LKgCa0_F8YgI30QS3bUm9orFryrdOc65PUIVFVxIwMZuGDY1hj6HEJVWIr0CZdcgNIll06BasclckkUK4O-Eh7MaQrqb646ghFlG3zlgk9b2duHbDOq3s39ICPinRQWC6NqTYfqg7E8GN_NLY9srUCc_MswuUfMJ2cKT6edrhLuIwIj_74YGkpOwilr2VswKsvJ7dcoiJxheKYvKDKtZFkbKrWETTJSGX2Xeh0DFB0lqbKLVvqkM2lFU2Qx1OgtTnrw==",
            "e": "AQAB"
        }
    ]
};
let jwt_test = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDRkZjU4N2I1YTdjZWFkODBhYmVlOWVhOGRjZjc1ODZhNzhlMDEifQ.eyJhenAiOiI0NTQ1MzQ2ODUxNi01bXAwZjVpN3I2c2xjazE4ZW9hZTg3Y2s3b2ZxcjNzby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NDUzNDY4NTE2LTVtcDBmNWk3cjZzbGNrMThlb2FlODdjazdvZnFyM3NvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0NTY0NjEwMDUzNzQ0NTMwMTExIiwiaGQiOiJha2FtYWkuY29tIiwiZW1haWwiOiJjb2xpbmJAYWthbWFpLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUnQtSmFtcGtzaGd1NDh4TkxuQlpoQSIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MDI3Njc1NTAsImV4cCI6MTUwMjc3MTE1MCwibmFtZSI6IkNvbGluIEJlbmRlbGwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sZGt2MDM4dTdKYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFUay9WWDdiUDdKeWo2MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ29saW4iLCJmYW1pbHlfbmFtZSI6IkJlbmRlbGwiLCJsb2NhbGUiOiJlbi1DQSJ9.IXp3wfMdzy9JLfDr51vkbPstlfcqVZK1tu8Su6XaDzz9aQbEdOG0tktECdKlAoyw1E2RrFYqzHbuk2CcJ-cUy5Mcerar-h5cbBglMxZkk9DOrd0iDjqW0mhCBkXiM9VavGjunhrzunPFRoVaLG6_j965UVnXY3gVnZIcMdFOLCyknmjpDJBlw1GGFEw3IyiyFuJFm1bDPZk0mMVNF0a2nKx_4386VX_SqZwHM_WszmIdlcnTIDS7LxTzm2IdHZ65ufFacvq4KPRtNxz_mterYRzUBSpWviiHm1ZAyUelIny6cwP_k4NR3--5UP2cSbFbSIG2hS1cw7gPWJXjGzi0-Q";
let parsed_jwt =  {
    "header": "{\"alg\":\"RS256\",\"kid\":\"ca04df587b5a7cead80abee9ea8dcf7586a78e01\"}",
    "payload": "{\"azp\":\"45453468516-5mp0f5i7r6slck18eoae87ck7ofqr3so.apps.googleusercontent.com\",\"aud\":\"45453468516-5mp0f5i7r6slck18eoae87ck7ofqr3so.apps.googleusercontent.com\",\"sub\":\"104564610053744530111\",\"hd\":\"akamai.com\",\"email\":\"colinb@akamai.com\",\"email_verified\":true,\"at_hash\":\"Rt-Jampkshgu48xNLnBZhA\",\"iss\":\"accounts.google.com\",\"iat\":1502767550,\"exp\":1502771150,\"name\":\"Colin Bendell\",\"picture\":\"https://lh4.googleusercontent.com/-ldkv038u7Jc/AAAAAAAAAAI/AAAAAAAAATk/VX7bP7Jyj60/s96-c/photo.jpg\",\"given_name\":\"Colin\",\"family_name\":\"Bendell\",\"locale\":\"en-CA\"}",
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDRkZjU4N2I1YTdjZWFkODBhYmVlOWVhOGRjZjc1ODZhNzhlMDEifQ.eyJhenAiOiI0NTQ1MzQ2ODUxNi01bXAwZjVpN3I2c2xjazE4ZW9hZTg3Y2s3b2ZxcjNzby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NDUzNDY4NTE2LTVtcDBmNWk3cjZzbGNrMThlb2FlODdjazdvZnFyM3NvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0NTY0NjEwMDUzNzQ0NTMwMTExIiwiaGQiOiJha2FtYWkuY29tIiwiZW1haWwiOiJjb2xpbmJAYWthbWFpLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUnQtSmFtcGtzaGd1NDh4TkxuQlpoQSIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MDI3Njc1NTAsImV4cCI6MTUwMjc3MTE1MCwibmFtZSI6IkNvbGluIEJlbmRlbGwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sZGt2MDM4dTdKYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFUay9WWDdiUDdKeWo2MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ29saW4iLCJmYW1pbHlfbmFtZSI6IkJlbmRlbGwiLCJsb2NhbGUiOiJlbi1DQSJ9.IXp3wfMdzy9JLfDr51vkbPstlfcqVZK1tu8Su6XaDzz9aQbEdOG0tktECdKlAoyw1E2RrFYqzHbuk2CcJ-cUy5Mcerar-h5cbBglMxZkk9DOrd0iDjqW0mhCBkXiM9VavGjunhrzunPFRoVaLG6_j965UVnXY3gVnZIcMdFOLCyknmjpDJBlw1GGFEw3IyiyFuJFm1bDPZk0mMVNF0a2nKx_4386VX_SqZwHM_WszmIdlcnTIDS7LxTzm2IdHZ65ufFacvq4KPRtNxz_mterYRzUBSpWviiHm1ZAyUelIny6cwP_k4NR3--5UP2cSbFbSIG2hS1cw7gPWJXjGzi0-Q",
    "message": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDRkZjU4N2I1YTdjZWFkODBhYmVlOWVhOGRjZjc1ODZhNzhlMDEifQ.eyJhenAiOiI0NTQ1MzQ2ODUxNi01bXAwZjVpN3I2c2xjazE4ZW9hZTg3Y2s3b2ZxcjNzby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NDUzNDY4NTE2LTVtcDBmNWk3cjZzbGNrMThlb2FlODdjazdvZnFyM3NvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0NTY0NjEwMDUzNzQ0NTMwMTExIiwiaGQiOiJha2FtYWkuY29tIiwiZW1haWwiOiJjb2xpbmJAYWthbWFpLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUnQtSmFtcGtzaGd1NDh4TkxuQlpoQSIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MDI3Njc1NTAsImV4cCI6MTUwMjc3MTE1MCwibmFtZSI6IkNvbGluIEJlbmRlbGwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sZGt2MDM4dTdKYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFUay9WWDdiUDdKeWo2MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ29saW4iLCJmYW1pbHlfbmFtZSI6IkJlbmRlbGwiLCJsb2NhbGUiOiJlbi1DQSJ9",
    "signature": "IXp3wfMdzy9JLfDr51vkbPstlfcqVZK1tu8Su6XaDzz9aQbEdOG0tktECdKlAoyw1E2RrFYqzHbuk2CcJ-cUy5Mcerar-h5cbBglMxZkk9DOrd0iDjqW0mhCBkXiM9VavGjunhrzunPFRoVaLG6_j965UVnXY3gVnZIcMdFOLCyknmjpDJBlw1GGFEw3IyiyFuJFm1bDPZk0mMVNF0a2nKx_4386VX_SqZwHM_WszmIdlcnTIDS7LxTzm2IdHZ65ufFacvq4KPRtNxz_mterYRzUBSpWviiHm1ZAyUelIny6cwP_k4NR3--5UP2cSbFbSIG2hS1cw7gPWJXjGzi0-Q==",
    "kid": "ca04df587b5a7cead80abee9ea8dcf7586a78e01"};
printv(assertEqual('parseJWT("eyJhbGciOi...Gzi0-Q")', parseJWT(jwt_test), str(parsed_jwt)));

//verify a valid url parsing
let verifyUrl = '/verify?data=eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDRkZjU4N2I1YTdjZWFkODBhYmVlOWVhOGRjZjc1ODZhNzhlMDEifQ.eyJhenAiOiI0NTQ1MzQ2ODUxNi01bXAwZjVpN3I2c2xjazE4ZW9hZTg3Y2s3b2ZxcjNzby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NDUzNDY4NTE2LTVtcDBmNWk3cjZzbGNrMThlb2FlODdjazdvZnFyM3NvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0NTY0NjEwMDUzNzQ0NTMwMTExIiwiaGQiOiJha2FtYWkuY29tIiwiZW1haWwiOiJjb2xpbmJAYWthbWFpLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUnQtSmFtcGtzaGd1NDh4TkxuQlpoQSIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MDI3Njc1NTAsImV4cCI6MTUwMjc3MTE1MCwibmFtZSI6IkNvbGluIEJlbmRlbGwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sZGt2MDM4dTdKYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFUay9WWDdiUDdKeWo2MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ29saW4iLCJmYW1pbHlfbmFtZSI6IkJlbmRlbGwiLCJsb2NhbGUiOiJlbi1DQSJ9&sig=IXp3wfMdzy9JLfDr51vkbPstlfcqVZK1tu8Su6XaDzz9aQbEdOG0tktECdKlAoyw1E2RrFYqzHbuk2CcJ-cUy5Mcerar-h5cbBglMxZkk9DOrd0iDjqW0mhCBkXiM9VavGjunhrzunPFRoVaLG6_j965UVnXY3gVnZIcMdFOLCyknmjpDJBlw1GGFEw3IyiyFuJFm1bDPZk0mMVNF0a2nKx_4386VX_SqZwHM_WszmIdlcnTIDS7LxTzm2IdHZ65ufFacvq4KPRtNxz_mterYRzUBSpWviiHm1ZAyUelIny6cwP_k4NR3--5UP2cSbFbSIG2hS1cw7gPWJXjGzi0-Q==&pem=-----BEGIN%20PUBLIC%20KEY-----%5cnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiXn%2bWmrwLLBa%2bQDiToBo%5cnzpu4Y4ThKdwORWFXQa9I75pKOvPUjUjE2Bk05TUSt7%2bV7KDjCq0%2fNkd%2bX9rMRV5L%5cnKgCa0%2fF8YgI30QS3bUm9orFryrdOc65PUIVFVxIwMZuGDY1hj6HEJVWIr0CZdcgN%5cnIll06BasclckkUK4O%2bEh7MaQrqb646ghFlG3zlgk9b2duHbDOq3s39ICPinRQWC6%5cnNqTYfqg7E8GN%2fNLY9srUCc%2fMswuUfMJ2cKT6edrhLuIwIj%2f74YGkpOwilr2VswKs%5cnvJ7dcoiJxheKYvKDKtZFkbKrWETTJSGX2Xeh0DFB0lqbKLVvqkM2lFU2Qx1OgtTn%5cnrwIDAQAB%5cn-----END%20PUBLIC%20KEY-----%5cn';
printv(assertEqual('getVerifyUrl("eyJhbGciOi...Gzi0-Q")', getVerifyUrl('/verify', jwt_test, jwks_test, false), verifyUrl));

//verify that we rejected the absense of the jwt token
verifyUrl = '/verify';
printv(assertEqual('getVerifyUrl("")', getVerifyUrl('/verify', "", "", false), verifyUrl));

verifyUrl = '/verify';
printv(assertEqual('getVerifyUrl()', getVerifyUrl('/verify', null, null, false), verifyUrl));

//necessary evil since this overrides the 302
printv(set_response_code(200));