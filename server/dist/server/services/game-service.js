"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReadGamesByPlayerid = exports.handleReadGameByGameid = void 0;
const client_1 = require("../db/client");
const game_db_1 = require("../db/models/game-db");
const player_db_1 = require("../db/models/player-db");
exports.handleReadGameByGameid = (gameId, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        const gameData = yield game_db_1.readGameDataByGameid(client, gameId, username);
        return gameData;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
exports.handleReadGamesByPlayerid = (username, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        const players = yield player_db_1.readOnePlayer(client, username);
        if (players) {
            const { gameIds } = players;
            const data = yield game_db_1.readMultipleGameData(client, gameIds.slice(0, limit), username);
            const map = {};
            data.forEach(gameData => {
                map[gameData.shortId] = gameData;
            });
            return map;
        }
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
// dropGames();
//# sourceMappingURL=game-service.js.map