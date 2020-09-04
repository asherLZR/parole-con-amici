import express from 'express';
import {
	handleReadGameByGameid,
	handleReadGamesByPlayerid,
} from './services/game-service';
import { handlePlayTurn } from './services/handle-play-turn';
import {
	handleGetAllPlayers,
	handleUpdateProfile,
	handleGetProfile,
} from './services/player-service';
import { handleCreateNewGame } from './services/new-game/new-game';
import cors from 'cors';
import { SocketTypes } from '../src/constants/socket';
import { profile } from 'console';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

const APP_URL = process.env.PCA_CLIENT || 'http://localhost:3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: APP_URL,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	})
);
app.set('io', io);

io.on('connection', function (socket: any) {
	socket.on(SocketTypes.JOIN, (username: string) => {
		socket.join(username);
		console.log(username, 'has joined a room!');
	});
});

// TODO: throw correct errors and clean up status codes - 400, 404, and 500 for all endpoints
app.route('/games/:username').get(async (req, res) => {
	const { username } = req.params;

	const games = await handleReadGamesByPlayerid(username);

	if (games) {
		res.json(games);
	} else {
		res.sendStatus(500);
	}
});

app.route('/new-game').post(async (req, res) => {
	const { language, username, usernames } = req.body;

	const newGame = await handleCreateNewGame(language, usernames);
	// if the game was successfully created, return game data for the specific user
	if (newGame) {
		const game = await handleReadGameByGameid(newGame.shortId, username);
		if (game) {
			res.json(game);
		} else {
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(500);
	}
});

app
	.route('/game/:username/:gameId')
	.get(async (req, res) => {
		const { gameId, username } = req.params;

		const game = await handleReadGameByGameid(gameId, username);

		if (game) {
			res.json(game);
		} else {
			res.sendStatus(404);
		}
	})
	.post(async (req, res) => {
		const { gameId, username } = req.params;
		const { placedTiles } = req.body;

		const callersGame = await handlePlayTurn(username, gameId, placedTiles);

		if (callersGame) {
			// update caller data with socket
			app.get('io').to(username).emit(gameId, JSON.stringify(callersGame));
			console.log('emitting to', username);

			callersGame.opponents.forEach(opponent => {
				handleReadGameByGameid(gameId, opponent.username)
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
		} else {
			res.sendStatus(500);
		}
	});

app
	.route('/player/:username')
	.get(async (req, res) => {
		const { username } = req.params;
		const profile = await handleGetProfile(username);
		if (profile) {
			res.json(profile);
		} else {
			res.sendStatus(401);
		}
	})
	.post(async (req, res) => {
		const { username } = req.params;
		const { profile } = req.body;
		const updatedProfile = await handleUpdateProfile(username, profile);
		res.json(updatedProfile);
	});

app.route('/players').get(async (req, res) => {
	const players = (await handleGetAllPlayers()) ?? {};
	res.json(players);
});

http.listen(port, function () {
	console.log(`server is listening on ${port}`);
});
