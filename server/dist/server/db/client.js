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
exports.getConnectedClient = void 0;
const mongodb_1 = require("mongodb");
const constants_1 = require("./constants");
const { DB_USER, DB_PWD, DB_CLUSTER } = process.env;
const dbName = constants_1.DB_NAMES.GAME_DB;
const uri = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_CLUSTER}/${dbName}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new mongodb_1.MongoClient(uri, options);
exports.getConnectedClient = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!client.isConnected()) {
        return client.connect();
    }
    return client;
});
//# sourceMappingURL=client.js.map