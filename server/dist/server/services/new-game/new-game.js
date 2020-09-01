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
exports.handleCreateNewGame = exports.insertGame = void 0;
const client_1 = require("../../db/client");
const new_game_data_1 = require("./new-game-data");
const tile_defaults_1 = require("../../../src/constants/tile-defaults");
const constants_1 = require("../../db/constants");
const create_new_tiles_1 = require("../../../src/lib/create-new-tiles");
const board_sizes_1 = require("../../../src/constants/board-sizes");
const shuffle_array_1 = require("../../../src/utilities/shuffle-array");
exports.insertGame = (client, newGame) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
        .insertOne(newGame);
    console.log(`Inserted new game with ID ${res.insertedId}`);
    return res;
});
/** Adds references to gamePlayerStates and game started date */
const updateNewGame = (client, gameId, gamePlayerIds) => __awaiter(void 0, void 0, void 0, function* () {
    const update = {
        $push: {
            gamePlayerIds: { $each: gamePlayerIds },
        },
        $currentDate: { dateStarted: { $type: 'date' } },
    };
    const options = { returnOriginal: false };
    const res = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
        .findOneAndUpdate({ shortId: gameId }, update, options);
    return res.value;
});
const insertGamePlayerStates = (client, newGameStates) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client
        .db(constants_1.DB_NAMES.GAME_DB)
        .collection(constants_1.COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
        .insertMany(newGameStates);
    return res;
});
const updatePlayersGames = (client, usernames, gameId) => __awaiter(void 0, void 0, void 0, function* () {
    return client
        .db(constants_1.DB_NAMES.PLAYER_DB)
        .collection(constants_1.COLLECTIONS.PLAYER_DB.PLAYER)
        .updateMany({ username: { $in: usernames } }, { $push: { gameIds: gameId } });
});
// TODO: make this a transaction, validate usernames exist
exports.handleCreateNewGame = (language, usernames) => __awaiter(void 0, void 0, void 0, function* () {
    let tilesInBag = tile_defaults_1.TileSet[language].tileset;
    // randomise order of players' turns
    const shuffledUsernames = shuffle_array_1.shuffleArray(usernames);
    // generate the tiles each player starts off with, removing them from the initial bag of tiles
    const racks = [];
    shuffledUsernames.forEach(_ => {
        const { newTilesInBag, newTiles } = create_new_tiles_1.createNewTilesFromBag(tilesInBag, board_sizes_1.RACK_LENGTH, language);
        tilesInBag = newTilesInBag;
        racks.push(newTiles);
    });
    const newGame = new_game_data_1.initialGame(tilesInBag, language);
    try {
        const client = yield client_1.getConnectedClient();
        exports.insertGame(client, newGame);
        const gameStates = shuffledUsernames.map((username, index) => {
            return new_game_data_1.initialGamePlayerState(newGame.shortId, username, index, racks[index]);
        });
        const insStateRes = yield insertGamePlayerStates(client, gameStates);
        updatePlayersGames(client, usernames, newGame.shortId);
        return updateNewGame(client, newGame.shortId, Object.values(insStateRes.insertedIds));
    }
    catch (e) {
        console.error(e);
    }
});
//# sourceMappingURL=new-game.js.map