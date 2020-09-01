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
exports.handlePlayTurn = void 0;
const client_1 = require("../db/client");
const game_db_1 = require("../db/models/game-db");
const create_new_tiles_1 = require("../../src/lib/create-new-tiles");
const calculate_move_score_1 = require("../../src/lib/calculate-move-score");
const board_helpers_1 = require("../../src/utilities/board-helpers");
/**
 * When a turn is played,
 * - update the tile on board
 * - increment turn counter
 * - update tiles in hand
 * - generate new tiles in hand
 * - increment player's score
 */
exports.handlePlayTurn = (username, gameId, placedTiles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.getConnectedClient();
        const initialState = yield game_db_1.readGameDataByGameid(client, gameId, username);
        if (initialState) {
            const { rack, language } = initialState;
            const placedTileIds = placedTiles.map(tile => tile.id);
            // remove tiles from the rack
            rack.forEach((tile, index) => {
                if (tile && placedTileIds.includes(tile.id)) {
                    rack[index] = undefined;
                }
            });
            // create new tiles to refresh the rack
            const { tilesInBag } = initialState;
            const tilesPlaced = placedTiles.length;
            const { newTiles, newTilesInBag } = create_new_tiles_1.createNewTilesFromBag(tilesInBag, tilesPlaced, language);
            // add refreshed tiles to rack
            let newTilesIndex = 0;
            rack.forEach((tile, index) => {
                if (!tile) {
                    rack[index] = newTiles[newTilesIndex];
                    newTilesIndex++;
                }
            });
            // check how much this play is worth
            const board = board_helpers_1.tilesToBoard(initialState.tilesOnBoard.concat(placedTiles.map(tile => (Object.assign(Object.assign({}, tile), { movable: true })))));
            const coords = placedTiles.map(tile => tile.boardPosition); // TODO: handle invalid argument
            const score = calculate_move_score_1.calculateMoveScore(initialState.turns === 0, coords, board, language);
            const updateSuccess = yield game_db_1.updateNewTurn(client, username, gameId, placedTiles, rack, newTilesInBag, score);
            if (updateSuccess) {
                return game_db_1.readGameDataByGameid(client, gameId, username);
            }
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
});
//# sourceMappingURL=handle-play-turn.js.map