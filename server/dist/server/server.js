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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_service_1 = require("./services/game-service");
const handle_play_turn_1 = require("./services/handle-play-turn");
const player_service_1 = require("./services/player-service");
const new_game_1 = require("./services/new-game/new-game");
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("../src/constants/socket");
const app = express_1.default();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const APP_URL = process.env.PCA_CLIENT || 'http://localhost:3000';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: APP_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));
app.set('io', io);
io.on('connection', function (socket) {
    socket.on(socket_1.SocketTypes.JOIN, (username) => {
        socket.join(username);
        console.log(username, 'has joined a room!');
    });
});
// TODO: throw correct errors and clean up status codes - 400, 404, and 500 for all endpoints
app.route('/games/:username').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const games = yield game_service_1.handleReadGamesByPlayerid(username);
    if (games) {
        res.json(games);
    }
    else {
        res.sendStatus(500);
    }
}));
app.route('/new-game').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, username, usernames } = req.body;
    const newGame = yield new_game_1.handleCreateNewGame(language, usernames);
    // if the game was successfully created, return game data for the specific user
    if (newGame) {
        const game = yield game_service_1.handleReadGameByGameid(newGame.shortId, username);
        if (game) {
            res.json(game);
        }
        else {
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus(500);
    }
}));
app
    .route('/game/:username/:gameId')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, username } = req.params;
    const game = yield game_service_1.handleReadGameByGameid(gameId, username);
    if (game) {
        res.json(game);
    }
    else {
        res.sendStatus(404);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, username } = req.params;
    const { placedTiles } = req.body;
    const callersGame = yield handle_play_turn_1.handlePlayTurn(username, gameId, placedTiles);
    if (callersGame) {
        // update caller data with socket
        app.get('io').to(username).emit(gameId, JSON.stringify(callersGame));
        console.log('emitting to', username);
        callersGame.opponents.forEach(opponent => {
            game_service_1.handleReadGameByGameid(gameId, opponent.username)
                .then(opponentsGame => {
                console.log('emitting to', opponent.username);
                if (opponentsGame) {
                    app
                        .get('io')
                        .to(opponent.username)
                        .emit(gameId, JSON.stringify(opponentsGame));
                }
            })
                .then(e => console.error(e));
        });
        // send status to caller without data
        res.sendStatus(200);
    }
    else {
        res.sendStatus(500);
    }
}));
app
    .route('/player/:username')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const profile = yield player_service_1.handleGetProfile(username);
    res.json(profile);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const { profile } = req.body;
    const updatedProfile = yield player_service_1.handleUpdateProfile(username, profile);
    res.json(updatedProfile);
}));
app.route('/players').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const players = (_a = (yield player_service_1.handleGetAllPlayers())) !== null && _a !== void 0 ? _a : {};
    res.json(players);
}));
http.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map