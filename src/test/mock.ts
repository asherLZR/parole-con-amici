import { DbGame, DbPlayer, DbGamePlayerState } from '../types/DbTypes';
import { Tiles } from '../types/TileTypes';

// export const mockGameId = '5f042e4c2345055d38223f34';
export const mockGameId = 'qWLRtA8pP';
export const mockGamePlayerStateId = '5f0439730eed0826b68e2e85';
export const mockPlayerOneId = '5f0a62c84e3be4a1d597379c';
export const mockPlayerTwoId = '5f0a635a4e3be4a1d597379d';

export const mockUsernameOne = 'user-1';
export const mockUsernameTwo = 'user-2';

export const MOCK_TILE_DEFAULTS: Tiles = {
	a: { count: 8, points: 1 },
	b: { count: 1, points: 3 },
	c: { count: 1, points: 3 },
	d: { count: 3, points: 2 },
	e: { count: 10, points: 1 },
	f: { count: 2, points: 4 },
	g: { count: 2, points: 2 },
	h: { count: 1, points: 4 },
	i: { count: 9, points: 1 },
	j: { count: 1, points: 8 },
	k: { count: 1, points: 5 },
	l: { count: 2, points: 1 },
	m: { count: 2, points: 3 },
	n: { count: 6, points: 1 },
	o: { count: 7, points: 1 },
	p: { count: 2, points: 3 },
	q: { count: 1, points: 10 },
	r: { count: 6, points: 1 },
	s: { count: 4, points: 1 },
	t: { count: 6, points: 1 },
	u: { count: 4, points: 1 },
	v: { count: 2, points: 4 },
	w: { count: 2, points: 4 },
	x: { count: 1, points: 8 },
	y: { count: 2, points: 4 },
	z: { count: 1, points: 10 },
	blank: { count: 1, points: 0 },
};

export const mockGame: Partial<DbGame> = {
	shortId: mockGameId,
	dateStarted: 'some-date',
	tilesOnBoard: [
		{
			id: 0,
			boardPosition: { row: 7, col: 3 },
			character: 'h',
		},
		{
			id: 1,
			boardPosition: { row: 7, col: 4 },
			character: 'e',
		},
		{
			id: 2,
			boardPosition: { row: 7, col: 5 },
			character: 'l',
		},
		{
			id: 3,
			boardPosition: { row: 7, col: 6 },
			character: 'l',
		},
		{
			id: 4,
			boardPosition: { row: 7, col: 7 },
			character: 'o',
		},
	],
	turns: 10,
	words: [
		{
			text: 'hello',
			boardCoords: [
				{ row: 0, col: 1 },
				{ row: 0, col: 5 },
			],
			score: 50,
			playedBy: mockPlayerOneId,
		},
	],
	winner: undefined,
	gamePlayerIds: [mockGamePlayerStateId, '5f1bb0c528f4dc71c4de9b9d'],
	tilesInBag: MOCK_TILE_DEFAULTS,
};

export const mockGamePlayerState: DbGamePlayerState = {
	_id: mockGamePlayerStateId,
	username: mockUsernameOne,
	gameId: mockGameId,
	score: 0,
	turnOrder: 0, // number between [0,3]
	rack: [
		{ id: 5, character: 'a', movable: true },
		{ id: 6, character: 'b', movable: true },
		{ id: 7, character: 'c', movable: true },
		{ id: 8, character: 'd', movable: true },
		{ id: 9, character: 'e', movable: true },
		{ id: 10, character: 'blank', movable: true, isBlank: true },
		{ id: 11, character: 'g', movable: true },
	],
};

export const mockPlayer1: DbPlayer = {
	_id: mockPlayerOneId,
	username: mockUsernameOne,
	gameIds: [],
	emoji: '',
};

export const mockPlayer2: DbPlayer = {
	_id: mockPlayerTwoId,
	username: mockUsernameTwo,
	gameIds: [],
	emoji: '',
};

export const mockUsers: DbPlayer[] = [mockPlayer1, mockPlayer2];
