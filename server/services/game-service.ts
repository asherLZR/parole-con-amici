import { getConnectedClient } from '../db/client';
import {
	readGameDataByGameid,
	readMultipleGameData,
} from '../db/models/game-db';
import { GameData } from '../../src/types/GameTypes';
import { Maybe } from '../../src/types/UtilityTypes';
import { readOnePlayer } from '../db/models/player-db';
import { dropGames } from '../test-utils/drop-all';

export const handleReadGameByGameid = async (
	gameId: string,
	username: string
): Promise<Maybe<GameData>> => {
	try {
		const client = await getConnectedClient();
		const gameData = await readGameDataByGameid(client, gameId, username);
		return gameData;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const handleReadGamesByPlayerid = async (
	username: string,
	limit: number = 10
): Promise<Maybe<Record<string, GameData>>> => {
	try {
		const client = await getConnectedClient();
		const players = await readOnePlayer(client, username);
		if (players) {
			const { gameIds } = players;
			const data = await readMultipleGameData(
				client,
				gameIds.slice(0, limit),
				username
			);
			const map: Record<string, GameData> = {};
			data.forEach(gameData => {
				map[gameData.shortId] = gameData;
			});
			return map;
		}
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

// dropGames();
