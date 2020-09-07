import {
	PlacedTile,
	Game,
	BoardCoords,
	GameData,
} from '../../src/types/GameTypes';
import { Maybe } from '../../src/types/UtilityTypes';
import { getConnectedClient } from '../db/client';
import { readGameDataByGameid, updateNewTurn } from '../db/models/game-db';
import { createNewTilesFromBag } from '../../src/lib/create-new-tiles';
import { calculateMoveScore } from '../../src/lib/calculate-move-score';
import { tilesToBoard } from '../../src/utilities/board-helpers';

/**
 * When a turn is played,
 * - update the tile on board
 * - increment turn counter
 * - update tiles in hand
 * - generate new tiles in hand
 * - increment player's score
 */
export const handlePlayTurn = async (
	username: string,
	gameId: string,
	placedTiles: PlacedTile[]
): Promise<Maybe<GameData>> => {
	try {
		const client = await getConnectedClient();
		const initialState = await readGameDataByGameid(client, gameId, username);

		if (initialState) {
			const { rack, language } = initialState;
			const placedTileIds = placedTiles.map(tile => tile.id);

			// remove tiles from the rack
			rack.forEach((tile, index) => {
				if (tile && placedTileIds.includes(tile.id)) {
					rack[index] = undefined;
				}
			});

			// create new tiles to refresh the rack
			const { tilesInBag } = initialState;
			const tilesPlaced = placedTiles.length;
			const { newTiles, newTilesInBag } = createNewTilesFromBag(
				tilesInBag,
				tilesPlaced,
				language
			);

			// add refreshed tiles to rack
			let newTilesIndex = 0;
			rack.forEach((tile, index) => {
				if (!tile) {
					rack[index] = newTiles[newTilesIndex];
					newTilesIndex++;
				}
			});

			// check how much this play is worth
			const board = tilesToBoard(
				initialState.tilesOnBoard.concat(
					placedTiles.map(tile => ({ ...tile, movable: true }))
				),
				[]
			);
			const coords = placedTiles.map(tile => tile.boardPosition as BoardCoords); // TODO: handle invalid argument
			const score = calculateMoveScore(
				initialState.turns === 0,
				coords,
				board,
				language
			);

			const updateSuccess = await updateNewTurn(
				client,
				username,
				gameId,
				placedTiles,
				rack,
				newTilesInBag,
				score
			);

			if (updateSuccess) {
				return readGameDataByGameid(client, gameId, username);
			}
		}
		return undefined;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
