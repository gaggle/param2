"use strict";
exports.getArgsContent = function () {
  var keys = process.argv.slice(2).filter(function (arg) {
    return arg[0] === "-"
  })

  return keys.reduce(function (obj, key, i) {
    obj[key.replace(/^\-+/g, "")] = process.argv[process.argv.indexOf(key) + 1]
    return obj
  }, {})
}
