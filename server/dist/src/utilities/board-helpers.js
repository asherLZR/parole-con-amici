"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVerticalBoundsOfWord = exports.findHorizontalBoundsOfWord = exports.getAdjacentBoardPositions = exports.isPositionWithinBoard = exports.isIndexWithinBoard = exports.tilesToBoard = exports.toIndex = exports.toBoardCoords = void 0;
const board_sizes_1 = require("../constants/board-sizes");
exports.toBoardCoords = (index) => ({
    row: Math.floor(index / board_sizes_1.SQUARES_PER_SIDE),
    col: index % board_sizes_1.SQUARES_PER_SIDE,
});
exports.toIndex = ({ row, col }) => {
    return row * board_sizes_1.SQUARES_PER_SIDE + col;
};
exports.tilesToBoard = (placedTiles, lastPlayed) => {
    const board = [...Array(board_sizes_1.SQUARES_PER_SIDE)].map(() => [...Array(board_sizes_1.SQUARES_PER_SIDE)].fill(null));
    placedTiles.forEach((placedTile) => {
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
exports.isIndexWithinBoard = (index) => index > -1 && index < board_sizes_1.SQUARES_PER_SIDE;
exports.isPositionWithinBoard = ({ row, col }) => exports.isIndexWithinBoard(row) && exports.isIndexWithinBoard(col);
exports.getAdjacentBoardPositions = ({ row, col, }) => {
    const positions = {
        TOP: { row: row - 1, col },
        BOTTOM: { row: row + 1, col },
        LEFT: { row, col: col - 1 },
        RIGHT: { row, col: col + 1 },
    };
    return {
        TOP: exports.isPositionWithinBoard(positions.TOP) ? positions.TOP : undefined,
        BOTTOM: exports.isPositionWithinBoard(positions.BOTTOM)
            ? positions.BOTTOM
            : undefined,
        LEFT: exports.isPositionWithinBoard(positions.LEFT) ? positions.LEFT : undefined,
        RIGHT: exports.isPositionWithinBoard(positions.RIGHT) ? positions.RIGHT : undefined,
    };
};
/**
 * Given the position of a tile on the board, return the inclusive range of the horizontal word formed
 * with that tile
 */
exports.findHorizontalBoundsOfWord = ({ row, col }, board) => {
    let leftIndex = col;
    while (exports.isIndexWithinBoard(leftIndex - 1) && board[row][leftIndex - 1]) {
        leftIndex--;
    }
    let rightIndex = col;
    while (exports.isIndexWithinBoard(rightIndex + 1) && board[row][rightIndex + 1]) {
        rightIndex++;
    }
    return { leftIndex, rightIndex };
};
/**
 * Given the position of a tile on the board, return the inclusive range of the vertical word formed
 * with that tile
 */
exports.findVerticalBoundsOfWord = ({ row, col }, board) => {
    let topIndex = row;
    while (exports.isIndexWithinBoard(topIndex - 1) && board[topIndex - 1][col]) {
        topIndex--;
    }
    let bottomIndex = row;
    while (exports.isIndexWithinBoard(bottomIndex + 1) && board[bottomIndex + 1][col]) {
        bottomIndex++;
    }
    return { topIndex, bottomIndex };
};
//# sourceMappingURL=board-helpers.js.map