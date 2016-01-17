"use strict";
var mock = require("mock-fs")
var expect = require("must")
var rewire = require("rewire")

var ORIG_ENV = process.env

describe("init (env)", function () {
  var param
  afterEach(function () {
    process.env = ORIG_ENV
    mock.restore()
  })

  it("should lookup env", function () {
    process.env = {foo: "bar"}
    param = rewire("../")
    expect(param("foo"))
      .to.eql("bar")
  })

  it("should lookup nested env", function () {
    process.env = {foo: '{"bar": "baz"}'}
    param = rewire("../")
    expect(param("foo.bar"))
      .to.eql("baz")
  })
})
