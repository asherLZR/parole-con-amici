import { Maybe } from '../types/UtilityTypes';
import { PlacedTile, BoardCoords } from '../types/GameTypes';
import {
	getAdjacentBoardPositions,
	findHorizontalBoundsOfWord,
	findVerticalBoundsOfWord,
} from '../utilities/board-helpers';
import { range } from 'lodash';
import { CENTRAL_SQUARE } from '../constants/board-sizes';

const isTileMovableOnBoard = (tile: PlacedTile) =>
	tile.movable && !!tile.boardPosition;

/**
 * Returns true if position provided is adjacent to at least one tile on the board which is not movable,
 * false otherwise
 */
const isAdjacentToAtLeastOneFixedTile = (
	position: Maybe<BoardCoords>,
	board: Maybe<PlacedTile>[][]
): boolean => {
	if (!position) {
		return false;
	}
	const adjacentPositions = getAdjacentBoardPositions(position);
	return Object.values(adjacentPositions).some(position => {
		if (position) {
			const { row, col } = position;
			const tile = board[row][col];
			if (tile) {
				return !tile.movable;
			}
		}
		return false;
	});
};

interface CountReturns {
	count: number;
	isAdjacentToFixed: boolean;
}

/**
 * Determines if the current tile adds to the tile count and if that tile is adjacent to
 * a fixed tile, returning an updated accumulator
 * @param acc Current state of the accumulator before updating
 * @param tile Tile to be examined
 * @param board Current state of the board
 */
const countMovableTilesHelper = (
	acc: CountReturns,
	tile: Maybe<PlacedTile>,
	board: Maybe<PlacedTile>[][]
): CountReturns => {
	if (tile && isTileMovableOnBoard(tile)) {
		const { count, isAdjacentToFixed } = acc;
		// add to count if tile is movable, and check if it is adjacent to any fixed tile
		return {
			count: count + 1,
			isAdjacentToFixed:
				isAdjacentToFixed ||
				isAdjacentToAtLeastOneFixedTile(tile.boardPosition, board),
		};
	}
	return acc;
};

const countMovableTilesInRow = (
	position: BoardCoords,
	board: Maybe<PlacedTile>[][]
): CountReturns => {
	// find left and right bounds of any horizontal word created by this tile
	const { leftIndex, rightIndex } = findHorizontalBoundsOfWord(position, board);

	return range(leftIndex, rightIndex + 1).reduce<CountReturns>(
		(acc, col) => {
			const tile = board[position.row][col];
			return countMovableTilesHelper(acc, tile, board);
		},
		{ count: 0, isAdjacentToFixed: false }
	);
};

const countMovableTilesInColumn = (
	position: BoardCoords,
	board: Maybe<PlacedTile>[][]
): CountReturns => {
	// find top and bottom bounds of any horizontal word created by this tile
	const { topIndex, bottomIndex } = findVerticalBoundsOfWord(position, board);

	return range(topIndex, bottomIndex + 1).reduce<CountReturns>(
		(acc, row) => {
			const tile = board[row][position.col];
			return countMovableTilesHelper(acc, tile, board);
		},
		{ count: 0, isAdjacentToFixed: false }
	);
};

/**
 * Given a valid board check if tiles added keep it valid
 * @param firstMove the first move does not require newly placed tiles to be adjacent to existing ones
 * @param board the board to validate against
 * @param positions a list of board positions for tiles newly placed on the board
 */
export const isValidNewMove = (
	firstMove: boolean,
	board: Maybe<PlacedTile>[][],
	positions: BoardCoords[]
): boolean => {
	// if there are no tiles to place, the move is invalid
	if (!positions.length) {
		return false;
	}

	// the central square must always be occupied
	if (!board[CENTRAL_SQUARE.row][CENTRAL_SQUARE.col]) {
		return false;
	}

	const startPosition = positions[0];

	// traverse the row created by the tile in the startPosition
	const {
		count: rowCount,
		isAdjacentToFixed: isAdjacentToFixedRow,
	} = countMovableTilesInRow(startPosition, board);
	// if there is more than 1 tile in a row, no columns of height > 1 may be formed
	if (rowCount !== 1) {
		const foundAllTiles = rowCount === positions.length;
		return firstMove ? foundAllTiles : foundAllTiles && isAdjacentToFixedRow;
	}

	// if there is only one tile in the row, search its column
	const {
		count: colCount,
		isAdjacentToFixed: isAdjacentToFixedCol,
	} = countMovableTilesInColumn(startPosition, board);
	const foundAllTiles = colCount === positions.length;
	return firstMove ? foundAllTiles : foundAllTiles && isAdjacentToFixedCol;
};
