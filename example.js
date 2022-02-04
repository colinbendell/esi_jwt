require('math.js');

let someVariable = {
    "foo": 123,
    "bar": 456
};

printv("The number " + someVariable.foo + ", when encoded in Hex is: " + hex(someVariable.foo));