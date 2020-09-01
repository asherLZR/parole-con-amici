import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PlacedTile, BoardCoords, GameData } from '../../types/GameTypes';
import { tilesToBoard } from '../../utilities/board-helpers';
import { Maybe } from '../../types/UtilityTypes';
import {
	getGameData,
	postMoveTiles,
	PostNewGame,
	postNewGame,
} from '../../api/game-api';
import { Character } from '../../types/TileTypes';
import { getUsername } from '../../utilities/local-storage';

export const socketUpdateGame = createAction<GameData>('SOCKET_UPDATE_GAME');

export const handleResetGameData = createAction<void>('RESET_STORE');

export const handleRestoreTiles = createAction<PlacedTile[]>('RESTORE_TILES');

const gameDataToGameState = (gameData: GameData) => {
	return {
		gameData,
		board: tilesToBoard(gameData.tilesOnBoard),
	};
};

export const handlePostNewGame = createAsyncThunk<
	{
		gameData: GameData;
		board: Maybe<PlacedTile>[][];
	},
	PostNewGame
>('POST_NEW_GAME', async ({ usernames, ...rest }, { rejectWithValue }) => {
	try {
		const gameData = await postNewGame({
			usernames: usernames.concat(getUsername()),
			...rest,
		});
		return gameDataToGameState(gameData);
	} catch (e) {
		return rejectWithValue(e);
	}
});

export const handleMoveTileToBoard = createAction<{
	tileId: number;
	boardPosition?: BoardCoords;
	nextPosition: BoardCoords;
}>('MOVE_TILE_TO_BOARD');

export const handleMoveTileToRack = createAction<{
	tileId: number;
	boardPosition?: BoardCoords;
	rackIndex: number;
}>('MOVE_TILE_TO_LIST');

export const handleGetGameData = createAsyncThunk<
	{
		gameData: GameData;
		board: Maybe<PlacedTile>[][];
	},
	string
>('FETCH_GAME_DATA', async (gameId, { rejectWithValue }) => {
	try {
		const gameData = await getGameData(gameId);
		return gameDataToGameState(gameData);
	} catch (e) {
		return rejectWithValue('Unable to fetch data');
	}
});

export const handlePostMoveTile = createAsyncThunk<
	boolean,
	{ gameId: string; placedTiles: PlacedTile[] }
>('HAND_TO_BOARD', async ({ gameId, placedTiles }) => {
	const fixedTiles = placedTiles.map(placedTile => ({
		...placedTile,
		movable: false,
	}));

	try {
		await postMoveTiles(gameId, fixedTiles);
		return true;
	} catch (e) {
		return false;
	}
});

export const updateTileCharacter = createAction<{
	character: Character;
	boardCoords: BoardCoords;
}>('UPDATE_TILE_CHARACTER');

export const handleShuffleTiles = createAction<void>('SHUFFLE_TILES');

export const snapTileWithinRack = createAction<{
	dragIndex: number;
	hoverIndex: number;
}>('SNAP_TILE');
