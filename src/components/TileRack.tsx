import React, { FC } from 'react';
import { makeStyles, Theme, Grid, Paper } from '@material-ui/core';
import { PlacedTile } from '../types/GameTypes';
import { calculateSquareVp, RACK_LENGTH } from '../constants/board-sizes';
import { Maybe } from '../types/UtilityTypes';
import { useDispatch } from 'react-redux';
import { snapTileWithinRack } from '../store/game-data/actions';
import { TileContainer } from './TileContainer';
import { v4 as uuid } from 'uuid';
import { range } from 'lodash';
import { Tiles } from '../types/TileTypes';

const useStyles = makeStyles<Theme, { boardVp: number }>((theme: Theme) => ({
	root: ({ boardVp }) => {
		return {
			height: `${calculateSquareVp(boardVp) + 3}vmin`,
			width: `${calculateSquareVp(boardVp) * (RACK_LENGTH + 5)}vmin`,
			backgroundColor: theme.palette.background.paper,
		};
	},
	rackContainer: { height: '100%' },
}));

export interface Props {
	tileRack?: Maybe<PlacedTile>[];
	boardVp: number;
	tileset: Tiles;
}

export const TileRack: FC<Props> = ({
	tileRack = Array(RACK_LENGTH).fill(null),
	boardVp,
	tileset,
}: Props) => {
	const classes = useStyles({ boardVp });
	const dispatch = useDispatch();

	const moveTile = (dragIndex: number, hoverIndex: number) => {
		dispatch(snapTileWithinRack({ dragIndex, hoverIndex }));
	};

	return (
		<Paper className={classes.root} square>
			<Grid
				container
				justify='space-around'
				alignItems='center'
				draggable='false'
				className={classes.rackContainer}
			>
				{range(RACK_LENGTH).map(i => {
					const placedTile = tileRack[i];
					return (
						<TileContainer
							key={placedTile?.id ?? uuid()} // assign a random uuid if there is no tile
							placedTile={placedTile}
							index={i}
							boardVp={boardVp}
							moveTile={moveTile}
							tileset={tileset}
						/>
					);
				})}
			</Grid>
		</Paper>
	);
};
