"use strict";
exports.getEnvContent = function () {
  var env = {}
  for (var key in process.env) {
    var value = process.env[key]
    try {
      value = JSON.parse(value)
    } catch (err) {
    }
    env[key] = value
  }
  return env
}
