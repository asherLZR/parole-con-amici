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
exports.updateProfile = exports.readAllPlayers = exports.readOnePlayer = void 0;
const constants_1 = require("../constants");
exports.readOnePlayer = (client, username) => __awaiter(void 0, void 0, void 0, function* () {
    return client
        .db(constants_1.DB_NAMES.PLAYER_DB)
        .collection(constants_1.COLLECTIONS.PLAYER_DB.PLAYER)
        .findOne({ username });
});
exports.readAllPlayers = (client) => __awaiter(void 0, void 0, void 0, function* () {
    return client
        .db(constants_1.DB_NAMES.PLAYER_DB)
        .collection(constants_1.COLLECTIONS.PLAYER_DB.PLAYER)
        .find({})
        .toArray();
});
exports.updateProfile = (client, username, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client
        .db(constants_1.DB_NAMES.PLAYER_DB)
        .collection(constants_1.COLLECTIONS.PLAYER_DB.PLAYER)
        .findOneAndUpdate({ username }, { $set: { emoji: profile.emoji } }, { returnOriginal: false });
    return res.value;
});
//# sourceMappingURL=player-db.js.map