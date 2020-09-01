import { BoardCoords } from '../types/GameTypes';

export const SQUARES_PER_SIDE: number = 15;

/**
 * Size of the standard board in viewport units
 */
export const BOARD_VP = 80;

/**
 * Margins of each square in viewport units
 */
export const MARGIN_VP = 0;

/**
 * Size of each square in viewport units
 */
export const calculateSquareVp = (boardVp: number) =>
	Math.fround((boardVp - SQUARES_PER_SIDE * MARGIN_VP * 2) / SQUARES_PER_SIDE);

export const RACK_LENGTH = 7;

export const CENTRAL_SQUARE: BoardCoords = {
	row: 7,
	col: 7,
};
