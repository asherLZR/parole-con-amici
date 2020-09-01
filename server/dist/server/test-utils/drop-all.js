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
exports.dropGames = void 0;
const constants_1 = require("../db/constants");
const client_1 = require("../db/client");
/**
 * USE WITH CARE!!!
 */
exports.dropGames = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield client_1.getConnectedClient();
    const session = client.startSession();
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const gamesRes = yield client
                .db(constants_1.DB_NAMES.GAME_DB)
                .collection(constants_1.COLLECTIONS.GAME_DB.GAMES)
                .deleteMany({}, { session });
            console.log(`drop: GAMES - ${gamesRes.result.ok}`);
            const statesRes = yield client
                .db(constants_1.DB_NAMES.GAME_DB)
                .collection(constants_1.COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
                .deleteMany({}, { session });
            console.log(`drop: GAME_PLAYER_STATES - ${statesRes.result.ok}`);
            const playerRes = yield client
                .db(constants_1.DB_NAMES.PLAYER_DB)
                .collection(constants_1.COLLECTIONS.PLAYER_DB.PLAYER)
                .updateMany({}, { $set: { gameIds: [] } }, { session });
            console.log(`drop: PLAYER - ${playerRes.result.ok}`);
        }));
    }
    finally {
        session.endSession();
    }
});
//# sourceMappingURL=drop-all.js.map