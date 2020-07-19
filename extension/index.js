"use strict";
var twitch_1 = require("./twitch");
var clipControl_1 = require("./clipControl");
var importCondition_1 = require("./importCondition");
module.exports = function (nodecg) {
    twitch_1.twitch(nodecg);
    clipControl_1.clipControl(nodecg);
    importCondition_1.importCondition(nodecg);
};
