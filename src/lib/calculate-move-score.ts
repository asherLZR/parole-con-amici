import { PlacedTile, BoardCoords } from '../types/GameTypes';
import {
	StarLocations,
	LetterMultipliers,
	WordMultipliers,
	Language,
	TileSet,
} from '../constants/tile-defaults';
import { BLANK_CHAR } from '../types/TileTypes';
import { Maybe } from '../types/UtilityTypes';
import {
	findHorizontalBoundsOfWord,
	findVerticalBoundsOfWord,
	toIndex,
} from '../utilities/board-helpers';
import { range } from 'lodash';

/**
 * Based on a tile's position on the board, return its base score multiplied by the letter multiplier
 * Also return the word multiplier if it exists, else 1
 */
const calculateTileScore = (
	placedTile: PlacedTile,
	language: Language
): {
	tileScore: number;
	wordMultiplier: number;
} => {
	const { character, isBlank, boardPosition } = placedTile;

	if (!boardPosition) {
		return { tileScore: 0, wordMultiplier: 1 };
	}

	const tileset = TileSet[language].tileset;

	const baseScore = isBlank
		? tileset[BLANK_CHAR].points
		: tileset[character].points;

	const starType = StarLocations.get(toIndex(boardPosition));
	if (!starType) {
		return { tileScore: baseScore, wordMultiplier: 1 };
	}

	const letterMultiplier = LetterMultipliers[starType];
	const wordMultiplier = WordMultipliers[starType];

	return {
		tileScore: letterMultiplier ? baseScore * letterMultiplier : baseScore,
		wordMultiplier: wordMultiplier ?? 1,
	};
};

const calculateWordScore = (
	startIndex: number,
	endIndex: number,
	getTile: (iterator: number) => Maybe<PlacedTile>,
	language: Language
): number => {
	// no additional score if the row/column formed is of width/height 1
	if (startIndex === endIndex) {
		return 0;
	}

	const { score, multiplier } = range(startIndex, endIndex + 1).reduce(
		(acc, iterator) => {
			const { score, multiplier } = acc;
			const tile = getTile(iterator) as PlacedTile; // this should never be undefined
			const { tileScore, wordMultiplier } = calculateTileScore(tile, language);
			return {
				score: score + tileScore,
				multiplier: multiplier * wordMultiplier,
			};
		},
		{ score: 0, multiplier: 1 }
	);

	return score * multiplier;
};

const calculateVerticalWordScore = (
	board: Maybe<PlacedTile>[][],
	language: Language
) => (coords: BoardCoords): number => {
	const { topIndex, bottomIndex } = findVerticalBoundsOfWord(coords, board);

	return calculateWordScore(
		topIndex,
		bottomIndex,
		row => board[row][coords.col],
		language
	);
};

const calculateHorizontalWordScore = (
	board: Maybe<PlacedTile>[][],
	language: Language
) => (coords: BoardCoords): number => {
	const { leftIndex, rightIndex } = findHorizontalBoundsOfWord(coords, board);

	return calculateWordScore(
		leftIndex,
		rightIndex,
		col => board[coords.row][col],
		language
	);
};

const countMovableTilesInRow = (
	leftIndex: number,
	rightIndex: number,
	row: number,
	board: Maybe<PlacedTile>[][]
) =>
	range(leftIndex, rightIndex + 1).reduce((acc, col) => {
		const tile = board[row][col] as PlacedTile; // this should never be undefined
		if (tile.movable) {
			return acc + 1;
		}
		return acc;
	}, 0);

/**
 * Loops over a specified range of consecutive tiles and returns the total score of
 * the words formed by that range
 **/
const calculateOverRange = (
	startIndex: number,
	endIndex: number,
	addScore: (boardPosition: BoardCoords) => number,
	getTile: (iterator: number) => Maybe<PlacedTile>,
	language: Language
) => {
	const { rangeScore, tangentScore, multiplier } = range(
		startIndex,
		endIndex + 1
	).reduce(
		(acc, iterator) => {
			const { rangeScore, tangentScore, multiplier } = acc;
			const tile = getTile(iterator) as PlacedTile; // this should never be undefined
			const { movable, boardPosition } = tile;
			const { tileScore, wordMultiplier } = calculateTileScore(tile, language);

			// if the tile is not fixed, add score of word on tangent axis formed by tile
			const newTangentScore =
				movable && boardPosition ? addScore(boardPosition) : 0;

			return {
				rangeScore: rangeScore + tileScore,
				tangentScore: tangentScore + newTangentScore,
				multiplier: multiplier * wordMultiplier,
			};
		},
		{ rangeScore: 0, tangentScore: 0, multiplier: 1 }
	);

	return rangeScore * multiplier + tangentScore;
};

/**
 * Assuming the move is valid, calculate the move score
 * @param firstMove to handle special case of first move and single tile
 * @param board positions of newly added tiles
 * @param board board containing existing tiles marked as movable:false, and new tiles marked as movable: true
 */
export const calculateMoveScore = (
	firstMove: boolean,
	positions: BoardCoords[],
	board: Maybe<PlacedTile>[][],
	language: Language
): number => {
	if (!positions.length) {
		return 0;
	}

	const startPos = positions[0];
	const getHorizontalWordScore = calculateHorizontalWordScore(board, language);
	const getVerticalWordScore = calculateVerticalWordScore(board, language);

	// edge case of 1 tile
	if (positions.length === 1) {
		// if it is the first move, it has no adjacent tiles
		if (firstMove) {
			const { row, col } = startPos;
			const { tileScore, wordMultiplier } = calculateTileScore(
				board[row][col] as PlacedTile,
				language
			);
			return tileScore * wordMultiplier;
		}
		// otherwise just take the sum of the row and column it forms
		return getHorizontalWordScore(startPos) + getVerticalWordScore(startPos);
	}

	const { row: startRow, col: startCol } = startPos;
	const { leftIndex, rightIndex } = findHorizontalBoundsOfWord(startPos, board);

	// if the play consists of tiles placed horizontally
	const isHorizontalPlay =
		countMovableTilesInRow(leftIndex, rightIndex, startRow, board) ===
		positions.length;

	// sum score of horizontal word and add score of vertical words formed by each movable tile
	if (isHorizontalPlay) {
		return calculateOverRange(
			leftIndex,
			rightIndex,
			getVerticalWordScore,
			col => board[startRow][col],
			language
		);
	}

	const { topIndex, bottomIndex } = findVerticalBoundsOfWord(startPos, board);
	// sum score of vertical word and add score of horizontal words formed by each movable tile
	return calculateOverRange(
		topIndex,
		bottomIndex,
		getHorizontalWordScore,
		row => board[row][startCol],
		language
	);
};
