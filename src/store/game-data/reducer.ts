import { createReducer } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';
import { PlacedTile, GameData, BoardCoords } from '../../types/GameTypes';
import { Maybe } from '../../types/UtilityTypes';
import {
	handleGetGameData,
	handleMoveTileToBoard,
	handleMoveTileToRack,
	handlePostMoveTile,
	updateTileCharacter,
	handleShuffleTiles,
	handlePostNewGame,
	handleResetGameData,
	snapTileWithinRack,
	handleRestoreTiles,
	socketUpdateGame,
	gameDataToGameState,
} from './actions';
import { cloneDeep } from 'lodash';
import { shuffleArray } from '../../utilities/shuffle-array';
import { swap } from '../../utilities/swap';

/**Selectors */
export const getIsPendingLoad = (state: RootState) =>
	state.GameData.isPendingLoad;
export const getIsPendingSave = (state: RootState) =>
	state.GameData.isPendingSave;
export const getBoard = (state: RootState) => state.GameData.board;
export const getGameData = (state: RootState) => state.GameData.gameData;

/**Reducer */
export interface GameState {
	gameData?: GameData;
	board?: Maybe<PlacedTile>[][];
	isPendingLoad: boolean;
	isPendingSave: boolean;
	error?: Error;
}

const initialState: GameState = {
	isPendingLoad: false,
	isPendingSave: false,
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(handleGetGameData.pending, state => {
		return {
			...state,
			isPendingLoad: true,
			error: undefined,
		};
	});

	builder.addCase(handleGetGameData.fulfilled, (_, action) => {
		return {
			...action.payload,
			isPendingLoad: false,
			isPendingSave: false,
			error: undefined,
		};
	});

	builder.addCase(handleGetGameData.rejected, () => {
		return {
			...initialState,
			// error: action.error,
		};
	});

	builder.addCase(socketUpdateGame, (state, action) => {
		const gameData = action.payload;
		return {
			...state,
			...gameDataToGameState(gameData),
		};
	});

	builder.addCase(handleMoveTileToBoard, (state, action) => {
		const { tileId, boardPosition, nextPosition } = action.payload;
		const { board, gameData } = state;

		if (board && gameData) {
			const rackIndex = gameData.rack.findIndex(tile => tileId === tile?.id);

			let placedTile: PlacedTile;
			// remove the tile from the rack if it is there
			if (rackIndex !== -1) {
				placedTile = cloneDeep(gameData.rack[rackIndex]) as PlacedTile;
				gameData.rack[rackIndex] = null;
			} else if (boardPosition) {
				// remove the tile from the board if it is there
				const { row, col } = boardPosition;
				const tileOnBoard = board[row][col] as PlacedTile;
				placedTile = cloneDeep(tileOnBoard);
				board[row][col] = undefined;
			} else {
				return;
			}

			// update the board
			const { row: nextRow, col: nextCol } = nextPosition;
			placedTile.boardPosition = nextPosition;
			board[nextRow][nextCol] = placedTile;
		}
	});

	builder.addCase(handleMoveTileToRack, (state, action) => {
		const { tileId, boardPosition, rackIndex } = action.payload;
		const { board, gameData } = state;

		if (board && gameData) {
			let placedTile: PlacedTile;
			// remove tile from board
			if (boardPosition) {
				const { row, col } = boardPosition;
				const tile = board[row][col] as PlacedTile;
				placedTile = cloneDeep(tile);
				board[row][col] = undefined;
			} else {
				// remove tile from previous rack position
				const tileIndex = gameData.rack.findIndex(tile => tile?.id === tileId);
				if (tileIndex !== -1) {
					placedTile = cloneDeep(gameData.rack[tileIndex]) as PlacedTile;
					gameData.rack[tileIndex] = null;
				} else {
					return;
				}
			}
			// add tile to new rack position
			placedTile.boardPosition = undefined;
			gameData.rack[rackIndex] = placedTile;
		}
	});

	builder.addCase(handlePostMoveTile.pending, state => {
		state.isPendingSave = true;
	});

	// TODO: do optimistic rendering here - revert changes on error
	builder.addCase(handlePostMoveTile.fulfilled, (state, action) => {
		const gameData = action.payload;
		return {
			...state,
			isPendingSave: false,
			...gameDataToGameState(gameData),
		};
	});

	builder.addCase(handlePostMoveTile.rejected, state => {
		state.isPendingSave = false;
	});

	builder.addCase(updateTileCharacter, (state, action) => {
		const { boardCoords, character } = action.payload;
		const board = state.board;

		if (boardCoords && board) {
			const { row, col } = boardCoords;
			const tile = board[row][col];
			if (tile) {
				tile.character = character;
			}
		}
	});

	builder.addCase(handleShuffleTiles, state => {
		if (state.gameData) {
			const rack = shuffleArray(state.gameData.rack);
			state.gameData.rack = rack;
		}
	});

	builder.addCase(handlePostNewGame.pending, state => {
		return {
			...state,
			isPendingLoad: true,
			error: undefined,
		};
	});

	builder.addCase(handlePostNewGame.fulfilled, (_, action) => {
		return {
			...action.payload,
			isPendingLoad: false,
			isPendingSave: false,
			error: undefined,
		};
	});

	builder.addCase(handlePostNewGame.rejected, () => {
		return {
			...initialState,
			// error: action.error,
		};
	});

	builder.addCase(handleResetGameData, () => {
		console.log('store reset');
		return initialState;
	});

	builder.addCase(snapTileWithinRack, (state, action) => {
		const { dragIndex, hoverIndex } = action.payload;
		const rack = state.gameData?.rack;

		if (!rack) {
			return;
		}

		swap(rack, dragIndex, hoverIndex);
	});

	builder.addCase(handleRestoreTiles, (state, action) => {
		const { board, gameData } = state;
		const movingTiles = action.payload;
		const rack = gameData?.rack;

		if (!board || !rack) {
			return;
		}

		let rackIndex = 0;

		// for each tile, find an empty spot in the rack, add it there, and remove from the board
		movingTiles.forEach(tile => {
			while (rackIndex < rack.length && rack[rackIndex]) {
				rackIndex++;
			}
			if (rackIndex < rack.length) {
				const { row, col } = tile.boardPosition as BoardCoords;
				board[row][col] = null;
				rack[rackIndex] = tile;
			}
		});
	});
});
