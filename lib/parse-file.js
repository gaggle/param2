"use strict";
var fs = require("fs")
var path = require("path")
var resolve = require("resolve")

exports.getArgsEnv = function () {
  var index = process.argv.indexOf('--config')
  if (index !== -1)
    return process.argv[index + 1]
}

exports.getFileContent = function (basedir, filename) {
  var opts = {
    basedir: basedir,
    extensions: [".js", ".json"],
    moduleDirectory: "config"
  }
  try {
    return require(resolve.sync(filename, opts))
  } catch (err) {
  }
}

exports.getBasedir = function (root_module) {
  if (root_module.parent)
    return path.dirname(root_module.parent.filename)
  return process.cwd()
}
