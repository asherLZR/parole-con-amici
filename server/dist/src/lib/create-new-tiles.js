"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTilesFromBag = void 0;
const TileTypes_1 = require("../types/TileTypes");
const shuffle_array_1 = require("../utilities/shuffle-array");
const lodash_1 = require("lodash");
const tile_defaults_1 = require("../constants/tile-defaults");
/**
 * Converts tile defaults to list of characters, each representing 1 count of that character
 */
const tileDefaultsToArray = (tiles) => {
    return Object.entries(tiles).flatMap(([character, tile]) => {
        return tile.count ? lodash_1.range(tile.count).map(_ => character) : [];
    });
};
/**
 * Takes the tiles in the bag and generates up to n randomly selected tiles from that bag
 */
exports.createNewTilesFromBag = (tilesInBag, n, language) => {
    const characterArray = tileDefaultsToArray(tilesInBag);
    const shuffledArray = shuffle_array_1.shuffleArray(characterArray);
    const newTilesInBag = lodash_1.cloneDeep(tilesInBag);
    // start using tileId based off the number of tiles left unused
    let tileId = tile_defaults_1.TileSet[language].count - characterArray.length;
    // generate new tiles from some random permutation of the characters available
    const newTiles = lodash_1.range(Math.min(n, shuffledArray.length)).map(index => {
        const character = shuffledArray[index];
        newTilesInBag[character].count--;
        return {
            id: tileId++,
            character,
            movable: true,
            isBlank: character === TileTypes_1.BLANK_CHAR ? true : undefined,
        };
    });
    return { newTiles, newTilesInBag };
};
//# sourceMappingURL=create-new-tiles.js.map