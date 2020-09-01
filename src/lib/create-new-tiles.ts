import { Tiles, BLANK_CHAR, Character } from '../types/TileTypes';
import { PlacedTile } from '../types/GameTypes';
import { shuffleArray } from '../utilities/shuffle-array';
import { cloneDeep, range } from 'lodash';
import { Language, TileSet } from '../constants/tile-defaults';

/**
 * Converts tile defaults to list of characters, each representing 1 count of that character
 */
const tileDefaultsToArray = (tiles: Tiles): Character[] => {
	return Object.entries(tiles).flatMap(([character, tile]) => {
		return tile.count ? range(tile.count).map(_ => character as Character) : [];
	});
};

/**
 * Takes the tiles in the bag and generates up to n randomly selected tiles from that bag
 */
export const createNewTilesFromBag = (
	tilesInBag: Tiles,
	n: number,
	language: Language
): {
	newTilesInBag: Tiles;
	newTiles: PlacedTile[];
} => {
	const characterArray = tileDefaultsToArray(tilesInBag);
	const shuffledArray = shuffleArray(characterArray);

	const newTilesInBag = cloneDeep(tilesInBag);

	// start using tileId based off the number of tiles left unused
	let tileId = TileSet[language].count - characterArray.length;
	// generate new tiles from some random permutation of the characters available
	const newTiles = range(Math.min(n, shuffledArray.length)).map(index => {
		const character = shuffledArray[index];
		newTilesInBag[character].count--;

		return {
			id: tileId++,
			character,
			movable: true,
			isBlank: character === BLANK_CHAR ? true : undefined,
		};
	});

	return { newTiles, newTilesInBag };
};
