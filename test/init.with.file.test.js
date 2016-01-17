"use strict";
var mock = require("mock-fs")
var expect = require("must")
var rewire = require("rewire")

var ORIG_NODE_ENV = process.env.NODE_ENV
var ORIG_ARGV = process.argv

describe("init (files)", function () {
  var param
  afterEach(mock.restore)

  it("should default to development file", function () {
    param = rewire("../")
    mock({"config": {"development.json": '{"foo":"bar"}'}})
    expect(param("foo"))
      .to.eql("bar")
  })

  describe("with env", function () {
    afterEach(function () { process.env.NODE_ENV = ORIG_NODE_ENV })

    it("should respect env.NODE_ENV", function () {
      process.env.NODE_ENV = "production"
      param = rewire("../")
      mock({"config": {"production.json": '{"ham":"spam"}'}})
      expect(param("ham"))
        .to.eql("spam")
    })
  })

  describe("with args", function () {
    afterEach(function () { process.argv = ORIG_ARGV })

    it("should respect --config", function () {
      process.argv = ["node", ".", "--config", "configuration"]
      param = rewire("../")
      mock({"config": {"configuration.json": '{"eggs":"bacon"}'}})
      expect(param("eggs"))
        .to.eql("bacon")
    })
  })
})
