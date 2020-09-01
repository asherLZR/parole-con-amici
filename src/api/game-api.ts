import { PlacedTile, GameData } from '../types/GameTypes';
import { Language } from '../constants/tile-defaults';
import { getUsername } from '../utilities/local-storage';
import { fetchApi } from './fetch';

export const getGameData = (gameId: string): Promise<GameData> => {
	return fetchApi(`/game/${getUsername()}/${gameId}`).then(res => res.json());
};

export const postMoveTiles = (
	gameId: string,
	placedTiles: PlacedTile[]
): Promise<void> => {
	return fetchApi(`/game/${getUsername()}/${gameId}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ placedTiles }),
	}).then(res => res.json());
};

export interface PostNewGame {
	language: Language;
	usernames: string[];
}

export const postNewGame = ({
	language,
	usernames,
}: PostNewGame): Promise<GameData> => {
	return fetchApi('/new-game', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: getUsername(), language, usernames }),
	}).then(res => res.json());
};

export const getPlayersGameData = (): Promise<Record<string, GameData>> => {
	return fetchApi(`/games/${getUsername()}`).then(res => res.json());
};
