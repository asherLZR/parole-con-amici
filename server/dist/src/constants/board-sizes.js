"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CENTRAL_SQUARE = exports.RACK_LENGTH = exports.calculateSquareVp = exports.MARGIN_VP = exports.BOARD_VP = exports.SQUARES_PER_SIDE = void 0;
exports.SQUARES_PER_SIDE = 15;
/**
 * Size of the standard board in viewport units
 */
exports.BOARD_VP = 80;
/**
 * Margins of each square in viewport units
 */
exports.MARGIN_VP = 0;
/**
 * Size of each square in viewport units
 */
exports.calculateSquareVp = (boardVp) => Math.fround((boardVp - exports.SQUARES_PER_SIDE * exports.MARGIN_VP * 2) / exports.SQUARES_PER_SIDE);
exports.RACK_LENGTH = 7;
exports.CENTRAL_SQUARE = {
    row: 7,
    col: 7,
};
//# sourceMappingURL=board-sizes.js.map