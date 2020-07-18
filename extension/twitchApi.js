"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var tokenUrl = 'https://id.twitch.tv/oauth2/token';
exports.authCredential = function (clientKey, clientSecret, scope) {
    if (scope === void 0) { scope = 'user:read:email'; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var parameters, query, response, e_1, error;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = {
                        'client_id': clientKey,
                        'client_secret': clientSecret,
                        'grant_type': 'client_credentials',
                        'scope': scope
                    };
                    query = Object.entries(parameters).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return key + "=" + value;
                    }).join('&');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(tokenUrl + "?" + query)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data['access_token']];
                case 3:
                    e_1 = _a.sent();
                    error = e_1;
                    if (error.response) {
                        throw new Error(error.response.data);
                    }
                    else {
                        throw new Error(error.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getBroadcaster = function (name, credentials) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url, query, response;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://api.twitch.tv/helix/users';
                query = "login=" + name;
                return [4 /*yield*/, axios_1.default.get(url + "?" + query, {
                        headers: {
                            'Client-ID': credentials.clientId,
                            'Authorization': "Bearer " + credentials.bearer
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data['data'][0]];
        }
    });
}); };
exports.getClips = function (broadcasterId, length, start, end, credentials) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url, parameters, response;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://api.twitch.tv/helix/clips';
                parameters = {
                    'broadcaster_id': broadcasterId,
                    first: length,
                    'started_at': start.toISOString(),
                    'ended_at': end.toISOString()
                };
                return [4 /*yield*/, axios_1.default.get(url, {
                        headers: {
                            'Client-ID': credentials.clientId,
                            'Authorization': "Bearer " + credentials.bearer
                        },
                        params: parameters
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data['data'].map(function (data) {
                        return {
                            broadcasterId: data.broadcaster_id,
                            broadcasterName: data.broadcaster_name,
                            createdAt: data.created_at,
                            creatorId: data.creator_id,
                            creatorName: data.creator_name,
                            embedUrl: data.embed_url,
                            gameId: data.game_id,
                            id: data.id,
                            language: data.language,
                            thumbnailUrl: data.thumbnail_url,
                            title: data.title,
                            url: data.url,
                            videoId: data.video_id,
                            viewCount: data.view_count,
                        };
                    })];
        }
    });
}); };
exports.getGames = function (gameIdArray, credentials) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url, query, response;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://api.twitch.tv/helix/games';
                query = gameIdArray.map(function (gameId) {
                    return "id=" + gameId;
                }).join('&');
                return [4 /*yield*/, axios_1.default.get(url + "?" + query, {
                        headers: {
                            'Client-ID': credentials.clientId,
                            'Authorization': "Bearer " + credentials.bearer
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data['data'].map(function (data) {
                        return {
                            boxArtUrl: data.box_art_url,
                            id: data.id,
                            name: data.name
                        };
                    })];
        }
    });
}); };
