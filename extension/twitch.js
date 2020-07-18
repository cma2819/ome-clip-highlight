"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var twitchApi_1 = require("./twitchApi");
exports.twitch = function (nodecg) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var logger, twitchClipArrayReplicant, clipStateArrayReplicant, twitchGameArrayReplicant, currentTwitchClipReplicant, clientKey, clientSecret;
    return tslib_1.__generator(this, function (_a) {
        logger = new nodecg.Logger(nodecg.bundleName + ":twitch");
        twitchClipArrayReplicant = nodecg.Replicant('twitchClipArray', {
            defaultValue: []
        });
        clipStateArrayReplicant = nodecg.Replicant('twitchClipStateArray', {
            defaultValue: []
        });
        twitchGameArrayReplicant = nodecg.Replicant('twitchGameArray', {
            defaultValue: []
        });
        currentTwitchClipReplicant = nodecg.Replicant('currentTwitchClip', {
            defaultValue: null
        });
        clientKey = nodecg.bundleConfig.twitch.key;
        clientSecret = nodecg.bundleConfig.twitch.secret;
        if (!clientKey || !clientSecret) {
            logger.error('Either Twitch client key or secret is invalid.');
            return [2 /*return*/];
        }
        nodecg.listenFor('importClip', function (_a) {
            var channel = _a.channel, sort = _a.sort, length = _a.length, start = _a.start, end = _a.end;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var bearer, broadcaster, clips, sortedClips, gameIdArray, games, e_1, error;
                var _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            logger.info("Processing import clips from [" + channel + "].");
                            twitchClipArrayReplicant.value = [];
                            clipStateArrayReplicant.value = [];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, twitchApi_1.authCredential(clientKey, clientSecret)];
                        case 2:
                            bearer = _c.sent();
                            if (!bearer) {
                                logger.error('Bearer token is undefined.');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, twitchApi_1.getBroadcaster(channel, {
                                    clientId: clientKey,
                                    bearer: bearer
                                })];
                        case 3:
                            broadcaster = _c.sent();
                            return [4 /*yield*/, twitchApi_1.getClips(broadcaster.id, length, new Date(Date.parse(start)), new Date(Date.parse(end)), {
                                    clientId: clientKey,
                                    bearer: bearer
                                })];
                        case 4:
                            clips = _c.sent();
                            sortedClips = clips.sort(function (a, b) {
                                if (a[sort] > b[sort]) {
                                    return -1;
                                }
                                if (a[sort] < b[sort]) {
                                    return 1;
                                }
                                return 0;
                            });
                            gameIdArray = sortedClips.map(function (clip) {
                                return clip.gameId;
                            });
                            return [4 /*yield*/, twitchApi_1.getGames(gameIdArray, {
                                    clientId: clientKey,
                                    bearer: bearer
                                })];
                        case 5:
                            games = _c.sent();
                            twitchClipArrayReplicant.value = sortedClips;
                            twitchGameArrayReplicant.value = games.map(function (game) {
                                return {
                                    id: game.id,
                                    name: game.name
                                };
                            });
                            clipStateArrayReplicant.value = sortedClips.map(function (clip, index) {
                                return {
                                    id: clip.id,
                                    disabled: false,
                                    rank: index + 1
                                };
                            });
                            currentTwitchClipReplicant.value = ((_b = sortedClips[0]) === null || _b === void 0 ? void 0 : _b.id) || null;
                            logger.info("Success to import clips from [" + channel + "].");
                            logger.info("Imported " + sortedClips.length + " clips with " + games.length + " games.");
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _c.sent();
                            error = e_1;
                            logger.error('Failed to import clip.');
                            logger.error(error.message);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        });
        return [2 /*return*/];
    });
}); };
