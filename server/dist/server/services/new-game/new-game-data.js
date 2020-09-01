"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialGamePlayerState = exports.initialGame = void 0;
const shortid_1 = __importDefault(require("shortid"));
exports.initialGame = (tilesInBag, language) => ({
    shortId: shortid_1.default.generate(),
    dateStarted: '',
    tilesOnBoard: [],
    turns: 0,
    words: [],
    winner: undefined,
    gamePlayerIds: [],
    tilesInBag,
    language,
});
exports.initialGamePlayerState = (gameId, username, turnOrder, rack) => ({
    username,
    gameId,
    score: 0,
    turnOrder,
    rack,
});
//# sourceMappingURL=new-game-data.js.map