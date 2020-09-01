import { createReducer } from '@reduxjs/toolkit';
import { RootState } from './root-reducer';
import {
	handleMoveTileToBoard,
	handlePostMoveTile,
	handleGetGameData,
	handleMoveTileToRack,
	handleRestoreTiles,
	socketUpdateGame,
} from './game-data/actions';
import { BoardCoords } from '../types/GameTypes';

/* Selectors */
export const getMovingTiles = (state: RootState) =>
	state.ActiveGame.movingTilesCoords;

/* Reducer*/
export interface ActiveGameState {
	movingTilesCoords: BoardCoords[];
}

const initialState: ActiveGameState = {
	movingTilesCoords: [],
};

const removeCoords = (
	movingTilesCoords: BoardCoords[],
	removedCoords: BoardCoords
) => {
	return movingTilesCoords.filter(
		coords =>
			removedCoords.row !== coords.row || removedCoords.col !== coords.col
	);
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(handleMoveTileToBoard, (state, action) => {
		const { boardPosition, nextPosition } = action.payload;
		if (boardPosition) {
			state.movingTilesCoords = removeCoords(
				state.movingTilesCoords,
				boardPosition
			);
		}
		state.movingTilesCoords.push(nextPosition);
	});

	builder.addCase(handlePostMoveTile.fulfilled, () => {
		return initialState;
	});

	builder.addCase(handleGetGameData.pending, () => {
		return initialState;
	});

	builder.addCase(handleRestoreTiles, () => {
		return initialState;
	});

	builder.addCase(handleMoveTileToRack, (state, action) => {
		const { boardPosition } = action.payload;

		if (boardPosition) {
			state.movingTilesCoords = removeCoords(
				state.movingTilesCoords,
				boardPosition
			);
		}
	});

	builder.addCase(socketUpdateGame, () => {
		return initialState;
	});
});
