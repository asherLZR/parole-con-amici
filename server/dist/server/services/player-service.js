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
exports.handleUpdateProfile = exports.handleGetProfile = exports.handleGetAllPlayers = void 0;
const client_1 = require("../db/client");
const player_db_1 = require("../db/models/player-db");
exports.handleGetAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        const players = yield player_db_1.readAllPlayers(client);
        const playersObject = {};
        players === null || players === void 0 ? void 0 : players.forEach(player => {
            playersObject[player.username] = player;
        });
        return playersObject;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
exports.handleGetProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        return player_db_1.readOnePlayer(client, username);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
exports.handleUpdateProfile = (username, profile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        return player_db_1.updateProfile(client, username, profile);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
//# sourceMappingURL=player-service.js.map