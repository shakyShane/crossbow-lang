var assert  = require("chai").assert;
var multi   = require("multiline");
var dust    = require("../../lib/server");


describe("Not fucking up formatting", function () {
    it("Can remove @ helper on single line", function (done) {

        var input = multi(function () {/*
Before {@shane /} After
         */})
        var expected = "Before After";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            assert.equal(out, expected);
            done();
        });
    });
    it("Can remove @ helpers on multi line", function (done) {

        var input = multi(function () {/*
Before
{@shane /}
After
*/})
        var expected = "Before\nAfter";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            assert.equal(out, expected);
            done();
        });
    });
    it("Can remove @ helpers on multi line (2)", function (done) {

        var input = multi(function () {/*
{@shane}
Content inside Helper
{/shane}
Shane is fixing templates
*/})
        var expected = "Shane is fixing templates";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            assert.equal(out, expected);
            done();
        });
    });
    it("Can remove @ helpers on multi line (2)", function (done) {

        var input = multi(function () {/*
Before
{name} After
Below
*/})
        var expected = "Before\nshane After\nBelow";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            assert.equal(out, expected);
            done()
        });
    });
    it("Can remove @ helpers on multi line (2)", function (done) {

        var input = multi(function () {/*
Before
{@hl}
Inside a helper
{/hl}
Below
*/})
        var expected = "Before\nBelow";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            require("d-logger")(out);
            assert.equal(out, expected);
            done();
        });
    });
    it("Can remove @ helpers on multi line (2)", function (done) {

        var input = multi(function () {/*
Before
{@hl lang="js"}
var shane = "awesome";
{/hl}
After
         */})
        //var expected = "Before\nBelow";

        dust.renderSource(input, {name: "shane"}, function (err, out) {
            require("d-logger")(out);
            assert.include(out, "\nAfter");
            //assert.equal(out, expected);
            done();
        });
    });
});
