function assertEqual(name, val, expect) {
    let message = "Fail! (expected: " + expect + " but got: " + val + ") ";
    if (val == expect) message = "Pass";
//    let message = (val == expect) ? "Pass" : "Fail";
    return "Test " + name + "... " + message + "\n";

}