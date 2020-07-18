"use strict";
var twitch_1 = require("./twitch");
var clipControl_1 = require("./clipControl");
module.exports = function (nodecg) {
    twitch_1.twitch(nodecg);
    clipControl_1.clipControl(nodecg);
};
