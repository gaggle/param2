"use strict";
var Config = require("./lib/Config")

var config = new Config()
module.exports = config.get.bind(config)
