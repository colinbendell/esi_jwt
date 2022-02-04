require('test.js');
require('math.js');

printv(assertEqual("powers(2,2)", power(2,2), 4));
printv(assertEqual("toBase16(65535)", toBase16(65535), "ffff"));
printv(assertEqual("toBase16(16)", toBase16(16), "10"));
printv(assertEqual("toBase16(8)", toBase16(8), "8"));
printv(assertEqual("toBase16('ffff')", toBase10("ffff"), 65535));
printv(assertEqual("toBase16(10)", toBase10("10"), 16));
printv(assertEqual("toBase16(8)", toBase10("8"), 8));
printv(assertEqual("toHex(8)", toHex(8), "08"));
printv(assertEqual("toHex(16)", toHex(16), "10"));
printv(assertEqual("hexToBase64('010001')", hexToBase64("010001"), "AQAB"));
printv(assertEqual("base64toHex('AQAB')", base64toHex("AQAB"), "010001"));