var assert  = require("chai").assert;
var multi   = require("multiline");
var dust    = require("../../lib/server");


describe("Not fucking up formatting", function () {
    it("Can remove @helper on single line", function () {

        var input = multi(function () {/*
Before {@shane /} After
         */})
        var expected = "Before After";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            require("d-logger")(out);
            assert.equal(out, expected);
        });
    });
    it("Can remove @helpers on multi line", function () {
        
        var input = multi(function () {/*
Before
{@shane /}
After
*/})
        var expected = "Before\nAfter";
        
        dust.renderSource(input, {name: "shane"}, function (err, out) {
            require("d-logger")(out);
            assert.equal(out, expected);
        });
    });
    it("Can remove @helpers on multi line (2)", function () {

        var input = multi(function () {/*
{@shane}
Content inside Helper
{/shane}
Shane is fixing templates
*/})
        var expected = "Shane is fixing templates";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            //console.log([out]);
            require("d-logger")(out);
            assert.equal(out, expected);
        });
    });
});
