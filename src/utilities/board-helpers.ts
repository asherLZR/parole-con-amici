import { BoardCoords, PlacedTile } from '../types/GameTypes';
import { SQUARES_PER_SIDE } from '../constants/board-sizes';
import { Maybe, Position } from '../types/UtilityTypes';

export const toBoardCoords = (index: number): BoardCoords => ({
	row: Math.floor(index / SQUARES_PER_SIDE),
	col: index % SQUARES_PER_SIDE,
});

export const toIndex = ({ row, col }: BoardCoords): number => {
	return row * SQUARES_PER_SIDE + col;
};

export const tilesToBoard = (
	placedTiles: PlacedTile[],
	lastPlayed: BoardCoords[]
): Maybe<PlacedTile>[][] => {
	const board = [...Array(SQUARES_PER_SIDE)].map(() =>
		[...Array(SQUARES_PER_SIDE)].fill(null)
	);

	placedTiles.forEach((placedTile: PlacedTile) => {
		const { boardPosition: position } = placedTile;
		if (position) {
			board[position.row][position.col] = placedTile;
		}
	});

	lastPlayed.forEach(({ row, col }) => {
		board[row][col].lastPlayed = true;
	});

	return board;
};

export const isIndexWithinBoard = (index: number) =>
	index > -1 && index < SQUARES_PER_SIDE;

export const isPositionWithinBoard = ({ row, col }: BoardCoords) =>
	isIndexWithinBoard(row) && isIndexWithinBoard(col);

export const getAdjacentBoardPositions = ({
	row,
	col,
}: BoardCoords): Record<Position, Maybe<BoardCoords>> => {
	const positions = {
		TOP: { row: row - 1, col },
		BOTTOM: { row: row + 1, col },
		LEFT: { row, col: col - 1 },
		RIGHT: { row, col: col + 1 },
	};
	return {
		TOP: isPositionWithinBoard(positions.TOP) ? positions.TOP : undefined,
		BOTTOM: isPositionWithinBoard(positions.BOTTOM)
			? positions.BOTTOM
			: undefined,
		LEFT: isPositionWithinBoard(positions.LEFT) ? positions.LEFT : undefined,
		RIGHT: isPositionWithinBoard(positions.RIGHT) ? positions.RIGHT : undefined,
	};
};

/**
 * Given the position of a tile on the board, return the inclusive range of the horizontal word formed
 * with that tile
 */
export const findHorizontalBoundsOfWord = (
	{ row, col }: BoardCoords,
	board: Maybe<PlacedTile>[][]
) => {
	let leftIndex = col;
	while (isIndexWithinBoard(leftIndex - 1) && board[row][leftIndex - 1]) {
		leftIndex--;
	}

	let rightIndex = col;
	while (isIndexWithinBoard(rightIndex + 1) && board[row][rightIndex + 1]) {
		rightIndex++;
	}

	return { leftIndex, rightIndex };
};

/**
 * Given the position of a tile on the board, return the inclusive range of the vertical word formed
 * with that tile
 */
export const findVerticalBoundsOfWord = (
	{ row, col }: BoardCoords,
	board: Maybe<PlacedTile>[][]
) => {
	let topIndex = row;
	while (isIndexWithinBoard(topIndex - 1) && board[topIndex - 1][col]) {
		topIndex--;
	}

	let bottomIndex = row;
	while (isIndexWithinBoard(bottomIndex + 1) && board[bottomIndex + 1][col]) {
		bottomIndex++;
	}

	return { topIndex, bottomIndex };
};
