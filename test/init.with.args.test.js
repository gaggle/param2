"use strict";
var mock = require("mock-fs")
var expect = require("must")
var rewire = require("rewire")

var ORIG_ARGV = process.argv

describe("init (args)", function () {
  var param
  afterEach(function () {
    process.argv = ORIG_ARGV
    mock.restore()
  })

  it("should lookup args", function () {
    process.argv = ["node", ".", "--ham", "spam"]
    param = rewire("../")
    expect(param("ham"))
      .to.eql("spam")
  })

  it("should lookup nested args", function () {
    process.argv = ["node", ".", "--ham.spam", "eggs"]
    param = rewire("../")
    expect(param("ham.spam"))
      .to.eql("eggs")
  })

})
