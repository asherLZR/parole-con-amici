"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMoveScore = void 0;
const tile_defaults_1 = require("../constants/tile-defaults");
const TileTypes_1 = require("../types/TileTypes");
const board_helpers_1 = require("../utilities/board-helpers");
const lodash_1 = require("lodash");
/**
 * Based on a tile's position on the board, return its base score multiplied by the letter multiplier
 * Also return the word multiplier if it exists, else 1
 */
const calculateTileScore = (placedTile, language) => {
    const { character, isBlank, boardPosition } = placedTile;
    if (!boardPosition) {
        return { tileScore: 0, wordMultiplier: 1 };
    }
    const tileset = tile_defaults_1.TileSet[language].tileset;
    const baseScore = isBlank
        ? tileset[TileTypes_1.BLANK_CHAR].points
        : tileset[character].points;
    const starType = tile_defaults_1.StarLocations.get(board_helpers_1.toIndex(boardPosition));
    if (!starType) {
        return { tileScore: baseScore, wordMultiplier: 1 };
    }
    const letterMultiplier = tile_defaults_1.LetterMultipliers[starType];
    const wordMultiplier = tile_defaults_1.WordMultipliers[starType];
    return {
        tileScore: letterMultiplier ? baseScore * letterMultiplier : baseScore,
        wordMultiplier: wordMultiplier !== null && wordMultiplier !== void 0 ? wordMultiplier : 1,
    };
};
const calculateWordScore = (startIndex, endIndex, getTile, language) => {
    // no additional score if the row/column formed is of width/height 1
    if (startIndex === endIndex) {
        return 0;
    }
    const { score, multiplier } = lodash_1.range(startIndex, endIndex + 1).reduce((acc, iterator) => {
        const { score, multiplier } = acc;
        const tile = getTile(iterator); // this should never be undefined
        const { tileScore, wordMultiplier } = calculateTileScore(tile, language);
        return {
            score: score + tileScore,
            multiplier: multiplier * wordMultiplier,
        };
    }, { score: 0, multiplier: 1 });
    return score * multiplier;
};
const calculateVerticalWordScore = (board, language) => (coords) => {
    const { topIndex, bottomIndex } = board_helpers_1.findVerticalBoundsOfWord(coords, board);
    return calculateWordScore(topIndex, bottomIndex, row => board[row][coords.col], language);
};
const calculateHorizontalWordScore = (board, language) => (coords) => {
    const { leftIndex, rightIndex } = board_helpers_1.findHorizontalBoundsOfWord(coords, board);
    return calculateWordScore(leftIndex, rightIndex, col => board[coords.row][col], language);
};
const countMovableTilesInRow = (leftIndex, rightIndex, row, board) => lodash_1.range(leftIndex, rightIndex + 1).reduce((acc, col) => {
    const tile = board[row][col]; // this should never be undefined
    if (tile.movable) {
        return acc + 1;
    }
    return acc;
}, 0);
/**
 * Loops over a specified range of consecutive tiles and returns the total score of
 * the words formed by that range
 **/
const calculateOverRange = (startIndex, endIndex, addScore, getTile, language) => {
    const { rangeScore, tangentScore, multiplier } = lodash_1.range(startIndex, endIndex + 1).reduce((acc, iterator) => {
        const { rangeScore, tangentScore, multiplier } = acc;
        const tile = getTile(iterator); // this should never be undefined
        const { movable, boardPosition } = tile;
        const { tileScore, wordMultiplier } = calculateTileScore(tile, language);
        // if the tile is not fixed, add score of word on tangent axis formed by tile
        const newTangentScore = movable && boardPosition ? addScore(boardPosition) : 0;
        return {
            rangeScore: rangeScore + tileScore,
            tangentScore: tangentScore + newTangentScore,
            multiplier: multiplier * wordMultiplier,
        };
    }, { rangeScore: 0, tangentScore: 0, multiplier: 1 });
    return rangeScore * multiplier + tangentScore;
};
/**
 * Assuming the move is valid, calculate the move score
 * @param firstMove to handle special case of first move and single tile
 * @param board positions of newly added tiles
 * @param board board containing existing tiles marked as movable:false, and new tiles marked as movable: true
 */
exports.calculateMoveScore = (firstMove, positions, board, language) => {
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
            const { tileScore, wordMultiplier } = calculateTileScore(board[row][col], language);
            return tileScore * wordMultiplier;
        }
        // otherwise just take the sum of the row and column it forms
        return getHorizontalWordScore(startPos) + getVerticalWordScore(startPos);
    }
    const { row: startRow, col: startCol } = startPos;
    const { leftIndex, rightIndex } = board_helpers_1.findHorizontalBoundsOfWord(startPos, board);
    // if the play consists of tiles placed horizontally
    const isHorizontalPlay = countMovableTilesInRow(leftIndex, rightIndex, startRow, board) ===
        positions.length;
    // sum score of horizontal word and add score of vertical words formed by each movable tile
    if (isHorizontalPlay) {
        return calculateOverRange(leftIndex, rightIndex, getVerticalWordScore, col => board[startRow][col], language);
    }
    const { topIndex, bottomIndex } = board_helpers_1.findVerticalBoundsOfWord(startPos, board);
    // sum score of vertical word and add score of horizontal words formed by each movable tile
    return calculateOverRange(topIndex, bottomIndex, getHorizontalWordScore, row => board[row][startCol], language);
};
//# sourceMappingURL=calculate-move-score.js.map