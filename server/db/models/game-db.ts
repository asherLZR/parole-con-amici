import { MongoClient, ObjectId } from 'mongodb';
import { PlacedTile } from '../../../src/types/GameTypes';
import { DB_NAMES, COLLECTIONS } from '../constants';
import { Maybe } from '../../../src/types/UtilityTypes';
import {
	DbGame,
	DbGamePlayerState,
	DbGameData,
} from '../../../src/types/DbTypes';
import { Tiles } from '../../../src/types/TileTypes';
import console from 'console';

const readGameByGameId = (
	client: MongoClient,
	gameId: string
): Promise<Maybe<DbGame>> => {
	return client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAMES)
		.findOne({ shortId: gameId });
};

/**
 * Retrieves the players' states for a given Game and combines them to form GameData
 * for a given user, which excludes the racks for the user's opponents
 */
const readGameToGameData = async (
	client: MongoClient,
	game: DbGame,
	username: string
): Promise<Maybe<DbGameData>> => {
	const ids = game.gamePlayerIds.map(id => new ObjectId(id));

	const gamePlayerStates: Maybe<DbGamePlayerState[]> = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
		.find({ _id: { $in: ids } })
		.toArray();

	const userState = gamePlayerStates.find(state => state.username === username);

	const opponents = gamePlayerStates.filter(
		state => state.username !== username
	);
	opponents.forEach(state => {
		delete state.rack;
	});

	if (userState) {
		return {
			...userState,
			...game,
			opponents,
		};
	}
};

export const readGameDataByGameid = async (
	client: MongoClient,
	gameId: string,
	username: string
): Promise<Maybe<DbGameData>> => {
	const game = await readGameByGameId(client, gameId);

	if (game) {
		return readGameToGameData(client, game, username);
	}
	return undefined;
};

const readGames = async (
	client: MongoClient,
	gameIds: string[]
): Promise<DbGame[]> => {
	const res = client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAMES)
		.find({ shortId: { $in: gameIds } })
		.toArray();
	return res;
};

export const readMultipleGameData = async (
	client: MongoClient,
	gameIds: string[],
	username: string
): Promise<DbGameData[]> => {
	const games = await readGames(client, gameIds);
	const gameDataPromises = games.map(game =>
		readGameToGameData(client, game, username)
	);
	const maybeGameData = await Promise.all(gameDataPromises);
	return maybeGameData.flatMap(gameData => (gameData ? [gameData] : []));
};

/**
 * Adds tiles to the board and increments the turn counter by 1
 */
const updateGameOnNewTurn = async (
	client: MongoClient,
	gameId: string,
	placedTiles: PlacedTile[],
	tilesInBag: Tiles
): Promise<Maybe<DbGame>> => {
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

	const res = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAMES)
		.findOneAndUpdate({ shortId: gameId }, update, options);
	return res.value;
};

/** Removes tiles from a player's hand, replacing them with new ones, and increments the score */
export const updateGamePlayerStateOnNewTurn = async (
	client: MongoClient,
	gamePlayerStateIds: string[],
	username: string,
	newRack: Maybe<PlacedTile>[],
	score: number
): Promise<Maybe<DbGamePlayerState>> => {
	const ids = gamePlayerStateIds.map(id => new ObjectId(id));

	const res = await client
		.db(DB_NAMES.GAME_DB)
		.collection(COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
		.findOneAndUpdate(
			{ _id: { $in: ids }, username },
			{
				$set: {
					rack: newRack,
				},
				$inc: { score },
			},
			{
				returnOriginal: false,
			}
		);
	return res.value;
};

// TODO: make this a transaction
export const updateNewTurn = async (
	client: MongoClient,
	username: string,
	gameId: string,
	placedTiles: PlacedTile[],
	newRack: Maybe<PlacedTile>[],
	newTilesInBag: Tiles,
	score: number
): Promise<Maybe<boolean>> => {
	const game = await updateGameOnNewTurn(
		client,
		gameId,
		placedTiles,
		newTilesInBag
	);
	if (game) {
		const gamePlayerState = await updateGamePlayerStateOnNewTurn(
			client,
			game.gamePlayerIds,
			username,
			newRack,
			score
		);

		if (gamePlayerState) {
			return true;
		}
	}
	return false;
};
