import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { PlacedTile, GameData } from '../types/GameTypes';
import { Maybe } from '../types/UtilityTypes';
import { getPlayersGameData } from '../api/game-api';
import { tilesToBoard } from '../utilities/board-helpers';
import { RootState } from './root-reducer';

export const handleGetPlayersGames = createAsyncThunk(
	'GET_PLAYERS_GAMES',
	async () => {
		const games = await getPlayersGameData();
		const map: Record<string, GameState> = {};
		Object.values(games).forEach(gameData => {
			const board = tilesToBoard(gameData.tilesOnBoard);
			map[gameData.shortId] = {
				gameData,
				board,
			};
		});
		return map;
	}
);

/**Selectors */
export const getBoardByGameId = (gameId: string) => (
	state: RootState
): Maybe<Maybe<PlacedTile>[][]> => state.Games.games[gameId]?.board;

// export const getAllBoards = (
// 	state: RootState
// ): Array<Maybe<PlacedTile>[][]> => {
// 	return Object.values(state.Games.games).map(state => state.board);
// };

// export const getAllTiles = (state: RootState): PlacedTile[][] => {
// 	return Object.values(state.Games.games).map(
// 		state => state.gameData.tilesOnBoard
// 	);
// };

export const getAllGameData = (state: RootState): Record<string, GameState> =>
	state.Games.games;

export const getIsPending = (state: RootState): boolean =>
	state.Games.isPending;

/**Reducer */
interface GameState {
	gameData: GameData;
	board: Maybe<PlacedTile>[][];
}

interface ReducerState {
	games: Record<string, GameState>;
	isPending: boolean;
	error?: Error;
}

const initialState: ReducerState = {
	games: {},
	isPending: false,
	error: undefined,
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(handleGetPlayersGames.pending, state => {
		state.isPending = true;
	});

	builder.addCase(handleGetPlayersGames.fulfilled, (_, action) => {
		return {
			games: action.payload,
			isPending: false,
			error: undefined,
		};
	});

	builder.addCase(handleGetPlayersGames.rejected, state => {
		state.isPending = false;
	});
});
