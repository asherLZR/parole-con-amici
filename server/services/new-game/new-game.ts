import { getConnectedClient } from '../../db/client';
import { initialGame, initialGamePlayerState } from './new-game-data';
import { Language, TileSet } from '../../../src/constants/tile-defaults';
import {
	MongoClient,
	InsertOneWriteOpResult,
	InsertWriteOpResult,
	UpdateWriteOpResult,
} from 'mongodb';
import { Maybe } from '../../../src/types/UtilityTypes';
import {
	Game,
	GamePlayerState,
	PlacedTile,
} from '../../../src/types/GameTypes';
import { DB_NAMES, COLLECTIONS } from '../../db/constants';
import { DbGame, DbGamePlayerState } from '../../../src/types/DbTypes';
import { createNewTilesFromBag } from '../../../src/lib/create-new-tiles';
import { RACK_LENGTH } from '../../../src/constants/board-sizes';
import { shuffleArray } from '../../../src/utilities/shuffle-array';

export const insertGame = async (
	client: MongoClient,
	newGame: Game
): Promise<InsertOneWriteOpResult<DbGame>> => {
	const res = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAMES)
		.insertOne(newGame);
	console.log(`Inserted new game with ID ${res.insertedId}`);
	return res;
};

/** Adds references to gamePlayerStates and game started date */
const updateNewGame = async (
	client: MongoClient,
	gameId: string,
	gamePlayerIds: string[]
): Promise<Maybe<DbGame>> => {
	const update = {
		$push: {
			gamePlayerIds: { $each: gamePlayerIds },
		},
		$currentDate: { dateStarted: { $type: 'date' } },
	};
	const options = { returnOriginal: false };

	const res = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAMES)
		.findOneAndUpdate({ shortId: gameId }, update, options);
	return res.value;
};

const insertGamePlayerStates = async (
	client: MongoClient,
	newGameStates: GamePlayerState[]
): Promise<InsertWriteOpResult<DbGamePlayerState>> => {
	const res = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
		.insertMany(newGameStates);
	return res;
};

const updatePlayersGames = async (
	client: MongoClient,
	usernames: string[],
	gameId: string
): Promise<UpdateWriteOpResult> => {
	return client
		.db(DB_NAMES.PLAYER_DB)
		.collection(COLLECTIONS.PLAYER_DB.PLAYER)
		.updateMany(
			{ username: { $in: usernames } },
			{ $push: { gameIds: gameId } }
		);
};

// TODO: make this a transaction, validate usernames exist
export const handleCreateNewGame = async (
	language: Language,
	usernames: string[]
): Promise<Maybe<DbGame>> => {
	let tilesInBag = TileSet[language].tileset;
	// randomise order of players' turns
	const shuffledUsernames = shuffleArray(usernames);

	// generate the tiles each player starts off with, removing them from the initial bag of tiles
	const racks: PlacedTile[][] = [];
	shuffledUsernames.forEach(_ => {
		const { newTilesInBag, newTiles } = createNewTilesFromBag(
			tilesInBag,
			RACK_LENGTH,
			language
		);
		tilesInBag = newTilesInBag;
		racks.push(newTiles);
	});

	const newGame = initialGame(tilesInBag, language);

	try {
		const client = await getConnectedClient();
		insertGame(client, newGame);

		const gameStates = shuffledUsernames.map((username, index) => {
			return initialGamePlayerState(
				newGame.shortId,
				username,
				index,
				racks[index]
			);
		});

		const insStateRes = await insertGamePlayerStates(client, gameStates);

		updatePlayersGames(client, usernames, newGame.shortId);

		return updateNewGame(
			client,
			newGame.shortId,
			Object.values(insStateRes.insertedIds)
		);
	} catch (e) {
		console.error(e);
	}
};
