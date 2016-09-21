var test = require('tape');
var sum = require("../lib/index.js");

test('initial test', function (t) {
    t.plan(1);
    t.equal(sum(1, 2), 3, "sum function");
});