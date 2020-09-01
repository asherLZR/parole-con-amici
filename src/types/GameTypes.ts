import { Character, Tiles } from './TileTypes';
import { Maybe } from './UtilityTypes';
import { Language } from '../constants/tile-defaults';

export type GameData = Game & GamePlayerState & { opponents: OpponentState[] };

// FIXME: not used at the moment
export enum State {
	START,
	PLAYING,
	COMPLETED,
}

export interface Game {
	shortId: string;
	dateStarted: string; // UTC on server side
	tilesOnBoard: PlacedTile[];
	turns: number;
	words: Word[];
	winner?: string;
	gamePlayerIds: string[];
	tilesInBag: Tiles;
	language: Language;
}

export interface OpponentState {
	username: string;
	gameId: string;
	score: number;
	turnOrder: number;
}

export interface GamePlayerState extends OpponentState {
	rack: Maybe<PlacedTile>[]; // invariant: len = 7
}

export interface Player extends Profile {
	username: string;
	gameIds: string[];
}

export interface Profile {
	emoji?: string;
}

export interface Word {
	text: string;
	score: number;
	boardCoords: [BoardCoords, BoardCoords];
	playedBy: string;
}

export interface PlacedTile {
	id: number;
	character: Character;
	boardPosition?: BoardCoords;
	movable?: boolean;
	isBlank?: boolean;
}

export interface BoardCoords {
	row: number;
	col: number;
}
