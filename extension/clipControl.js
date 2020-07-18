"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calcClipRank = function (clipStates) {
    var currentRank = 0;
    return clipStates.map(function (clip) {
        if (clip.disabled) {
            return Object.assign(clip, {
                rank: null
            });
        }
        currentRank++;
        return Object.assign(clip, {
            rank: currentRank
        });
    });
};
exports.clipControl = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":clip-control");
    var clipStateArrayReplicant = nodecg.Replicant('twitchClipStateArray', {
        defaultValue: []
    });
    var currentClipReplicant = nodecg.Replicant('currentTwitchClip', {
        defaultValue: null
    });
    nodecg.listenFor('enableClip', function (id) {
        var clips = clipStateArrayReplicant.value;
        var clipState = clips.find(function (state) {
            return state.id === id;
        });
        if (clipState) {
            clipState.disabled = false;
            logger.info("Clip[" + id + "] becomes enabled.");
        }
        clipStateArrayReplicant.value = calcClipRank(clips);
    });
    nodecg.listenFor('disableClip', function (id) {
        var clips = clipStateArrayReplicant.value;
        var clipState = clips.find(function (state) {
            return state.id === id;
        });
        if (clipState) {
            clipState.disabled = true;
            logger.info("Clip[" + id + "] becomes disabled.");
        }
        clipStateArrayReplicant.value = calcClipRank(clips);
    });
    nodecg.listenFor('transitionTo', function (id) {
        currentClipReplicant.value = id;
    });
};
