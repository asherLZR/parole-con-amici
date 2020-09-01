import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { PlacedTile } from '../../types/GameTypes';
import { BoardBackground } from './BoardBackground';
import { TileOverlay } from './TileOverlay';
import { Tiles } from '../../types/TileTypes';

const useStyles = makeStyles<Theme, { boardVp: number }>((theme: Theme) => ({
	boardContainer: () => ({
		width: 'fit-content',
		height: 'fit-content',
		position: 'relative',
		border: 'solid 5px',
		transition: '600ms',
		borderColor: theme.palette.primary.dark,
	}),
}));

interface Props {
	placedTiles: PlacedTile[];
	boardVp: number;
	tileset: Tiles;
}

export const BoardWithTiles = ({ placedTiles, boardVp, tileset }: Props) => {
	const classes = useStyles({ boardVp });

	return (
		<div className={classes.boardContainer}>
			<BoardBackground boardVp={boardVp} />
			<TileOverlay
				boardVp={boardVp}
				placedTiles={placedTiles}
				tileset={tileset}
			/>
		</div>
	);
};
