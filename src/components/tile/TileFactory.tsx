import React from 'react';
import { PopoverTile } from './PopoverTile';
import { DraggableTile } from './DraggableTile';
import { Tile } from './Tile';
import { GridProps } from '@material-ui/core';
import { PlacedTile } from '../../types/GameTypes';
import { Tiles } from '../../types/TileTypes';

export interface TileFactoryProps extends GridProps {
	placedTile: PlacedTile;
	boardVp: number;
	tileset: Tiles;
}

/**
 * Generates tile component based on whether it is a blank, movable, or fixed tile
 */
export const TileFactory = ({
	placedTile,
	tileset,
	...props
}: TileFactoryProps) => {
	const { movable, isBlank, character } = placedTile;

	if (movable) {
		if (isBlank) {
			return (
				<PopoverTile placedTile={placedTile} tileset={tileset} {...props} />
			);
		}
		return (
			<DraggableTile placedTile={placedTile} tileset={tileset} {...props} />
		);
	}

	return (
		<Tile
			character={character}
			score={isBlank ? undefined : tileset[character].points}
			{...props}
		/>
	);
};
