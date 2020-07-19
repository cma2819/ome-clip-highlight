"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCondition = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":import-condition");
    var importConditionReplicant = nodecg.Replicant('importCondition');
    nodecg.listenFor('saveCondition', function (condition) {
        importConditionReplicant.value = condition;
        logger.info('Import condition saved.');
    });
};
