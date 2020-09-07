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
exports.updateNewTurn = exports.updateGamePlayerStateOnNewTurn = exports.readMultipleGameData = exports.readGameDataByGameid = void 0;
const mongodb_1 = require("mongodb");
const constants_1 = require("../constants");
const readGameByGameId = (client, gameId) => {
    return client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
        .findOne({ shortId: gameId });
};
/**
 * Retrieves the players' states for a given Game and combines them to form GameData
 * for a given user, which excludes the racks for the user's opponents
 */
const readGameToGameData = (client, game, username) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = game.gamePlayerIds.map(id => new mongodb_1.ObjectId(id));
    const gamePlayerStates = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
        .find({ _id: { $in: ids } })
        .toArray();
    const userState = gamePlayerStates.find(state => state.username === username);
    const opponents = gamePlayerStates.filter(state => state.username !== username);
    opponents.forEach(state => {
        delete state.rack;
    });
    if (userState) {
        return Object.assign(Object.assign(Object.assign({}, userState), game), { opponents });
    }
});
exports.readGameDataByGameid = (client, gameId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield readGameByGameId(client, gameId);
    if (game) {
        return readGameToGameData(client, game, username);
    }
    return undefined;
});
const readGames = (client, gameIds) => __awaiter(void 0, void 0, void 0, function* () {
    const res = client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
        .find({ shortId: { $in: gameIds } })
        .toArray();
    return res;
});
exports.readMultipleGameData = (client, gameIds, username) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield readGames(client, gameIds);
    const gameDataPromises = games.map(game => readGameToGameData(client, game, username));
    const maybeGameData = yield Promise.all(gameDataPromises);
    return maybeGameData.flatMap(gameData => (gameData ? [gameData] : []));
});
/**
 * Adds tiles to the board and increments the turn counter by 1
 */
const updateGameOnNewTurn = (client, gameId, placedTiles, tilesInBag) => __awaiter(void 0, void 0, void 0, function* () {
    const update = {
        $push: {
            tilesOnBoard: { $each: placedTiles },
        },
        $inc: {
            turns: 1,
        },
        $set: {
            tilesInBag,
            lastPlayed: placedTiles.map(tile => tile.boardPosition),
        },
    };
    const options = { returnOriginal: false };
    const res = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
        .findOneAndUpdate({ shortId: gameId }, update, options);
    return res.value;
});
/** Removes tiles from a player's hand, replacing them with new ones, and increments the score */
exports.updateGamePlayerStateOnNewTurn = (client, gamePlayerStateIds, username, newRack, score) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = gamePlayerStateIds.map(id => new mongodb_1.ObjectId(id));
    const res = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
        .findOneAndUpdate({ _id: { $in: ids }, username }, {
        $set: {
            rack: newRack,
        },
        $inc: { score },
    }, {
        returnOriginal: false,
    });
    return res.value;
});
// TODO: make this a transaction
exports.updateNewTurn = (client, username, gameId, placedTiles, newRack, newTilesInBag, score) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield updateGameOnNewTurn(client, gameId, placedTiles, newTilesInBag);
    if (game) {
        const gamePlayerState = yield exports.updateGamePlayerStateOnNewTurn(client, game.gamePlayerIds, username, newRack, score);
        if (gamePlayerState) {
            return true;
        }
    }
    return false;
});
//# sourceMappingURL=game-db.js.map