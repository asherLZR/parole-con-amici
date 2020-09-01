"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTIONS = exports.DB_NAMES = void 0;
var DB_NAMES;
(function (DB_NAMES) {
    DB_NAMES["GAME_DB"] = "game-db";
    DB_NAMES["PLAYER_DB"] = "player-db";
})(DB_NAMES = exports.DB_NAMES || (exports.DB_NAMES = {}));
exports.COLLECTIONS = {
    GAME_DB: {
        GAMES: 'games',
        GAME_PLAYER_STATES: 'game-player-states',
    },
    PLAYER_DB: {
        PLAYER: 'player'
    }
};
//# sourceMappingURL=constants.js.map