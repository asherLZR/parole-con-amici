import shortid from 'shortid';
import { Tiles } from '../../../src/types/TileTypes';
import {
	GamePlayerState,
	Game,
	PlacedTile,
} from '../../../src/types/GameTypes';
import { Language } from '../../../src/constants/tile-defaults';

export const initialGame = (tilesInBag: Tiles, language: Language): Game => ({
	shortId: shortid.generate(),
	dateStarted: '',
	tilesOnBoard: [],
	turns: 0,
	words: [],
	winner: undefined,
	gamePlayerIds: [],
	tilesInBag,
	language,
	lastPlayed: [],
});

export const initialGamePlayerState = (
	gameId: string,
	username: string,
	turnOrder: number,
	rack: PlacedTile[]
): GamePlayerState => ({
	username,
	gameId,
	score: 0,
	turnOrder,
	rack,
});
