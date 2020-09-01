import React from 'react';
import { PlacedTile } from '../../types/GameTypes';
import { TileFactory } from '../tile/TileFactory';
import { SQUARES_PER_SIDE } from '../../constants/board-sizes';
import { Tiles } from '../../types/TileTypes';

interface Props {
	placedTiles: PlacedTile[];
	boardVp: number;
	tileset: Tiles;
}

export const TileOverlay = ({ placedTiles, boardVp, tileset }: Props) => {
	const squareSize = boardVp / SQUARES_PER_SIDE;

	return (
		<>
			{placedTiles.map(tile => {
				const coords = tile.boardPosition;
				return (
					coords && (
						<TileFactory
							key={coords.row + '-' + coords.col}
							placedTile={tile}
							boardVp={boardVp}
							tileset={tileset}
							style={{
								position: 'absolute',
								left: `${coords.col * squareSize}vmin`,
								top: `${coords.row * squareSize}vmin`,
							}}
						/>
					)
				);
			})}
		</>
	);
};
