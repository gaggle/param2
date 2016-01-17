"use strict";
var expect = require("must")
var rewire = require("rewire")

describe("Config", function () {
  var Config
  beforeEach(function () {
    Config = rewire("../lib/Config")
  })

  describe("#get", function () {
    it("should fail on no key", function () {
      expect(new Config().get)
        .to.throw("Can't get null or undefined")
    })

    it("should init data", function () {
      var c = new Config()
      c.get("foo")
      expect(c.initted).to.be.true()
    })

    it("should get value", function () {
      expect(new Config().set({foo: "bar"}).get("foo"))
        .to.eql("bar")
    })

    it("should get deep value", function () {
      expect(new Config().set({foo: {bar: "baz"}}).get("foo.bar"))
        .to.eql("baz")
    })
  })

  describe("#set", function () {
    it("should fail on no data", function () {
      expect(new Config().set)
        .to.throw("Can't set null or undefined")
    })

    it("should init data on setting", function () {
      var c = new Config()
      c.set({foo: "bar"})
      expect(c.initted).to.be.true()
    })

    it("should return object", function () {
      expect(new Config().set({foo: "bar"}))
        .to.be.instanceof(Config)
    })

    it("should actually set data", function () {
      var c = new Config().set({foo: "bar"})
      expect(c.data.foo)
        .to.eql("bar")
    })

    it("should override data", function () {
      var c = new Config().set({foo: "bar"})
      c.set({foo: "ham"})
      expect(c.data.foo)
        .to.eql("ham")
    })

    it("should deep override data", function () {
      var c = new Config().set({foo: {bar: "baz"}})
      c.set({foo: {bar: "ham"}})
      expect(c.data.foo.bar)
        .to.eql("ham")
    })

    it("should not change other leafs when overriding", function () {
      var c = new Config().set({foo: {bar: "baz", bacon: "eggs"}})
      c.set({foo: {bar: "ham"}})
      expect(c.data.foo.bacon)
        .to.eql("eggs")
    })
  })
})
