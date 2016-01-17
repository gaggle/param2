"use strict";
var _ = require("lodash")
var args = require("./parse-args"),
    env = require("./parse-env"),
    file = require("./parse-file")

var Config = function () {
  this.initted = false
  this.env = file.getArgsEnv() || process.env.NODE_ENV || "development"
  this.data = {}
}

Config.prototype.get = function (key) {
  if (_.isEmpty(key))
    throw new Error("Can't get null or undefined")
  if (!this.initted) this.init()
  return _.get(this.data, key)
}

Config.prototype.set = function (data) {
  if (_.isEmpty(data))
    throw new Error("Can't set null or undefined")
  if (!this.initted) this.init()
  _.merge(this.data, data)
  return this
}

Config.prototype.init = function () {
  this.initted = true
  _.merge(this.data, file.getFileContent(file.getBasedir(module), this.env))
  _.merge(this.data, env.getEnvContent())
  _.merge(this.data, args.getArgsContent())
}

module.exports = Config
