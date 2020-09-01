import React, { useRef } from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { DraggableTile, DragTileItem } from './tile/DraggableTile';
import { Maybe } from '../types/UtilityTypes';
import { PlacedTile } from '../types/GameTypes';
import { calculateSquareVp } from '../constants/board-sizes';
import { useDispatch } from 'react-redux';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { DraggableType } from '../types/DraggableTypes';
import { handleMoveTileToRack } from '../store/game-data/actions';
import { Tiles } from '../types/TileTypes';

const useStyles = makeStyles<Theme, { boardVp: number }>(theme => ({
	tileContainer: ({ boardVp }) => {
		return {
			width: `${calculateSquareVp(boardVp)}vmin`,
			height: `${calculateSquareVp(boardVp)}vmin`,
			backgroundColor: theme.palette.secondary.dark,
			boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
		};
	},
}));

interface Props {
	placedTile: Maybe<PlacedTile>;
	boardVp: number;
	index: number;
	moveTile: (dragIndex: number, hoverIndex: number) => void;
	tileset: Tiles;
}

export const TileContainer = ({
	placedTile,
	boardVp,
	index,
	moveTile,
	tileset,
}: Props) => {
	const classes = useStyles({ boardVp });
	const ref = useRef(null);
	const dispatch = useDispatch();

	const [, drop] = useDrop({
		accept: DraggableType.TILE,
		canDrop: (_, monitor: DropTargetMonitor) => {
			// only drop if the tile is dropped directly on the container
			return monitor.isOver({ shallow: true });
		},
		drop: (item: DragTileItem) => {
			const { id, boardPosition } = item;
			dispatch(
				handleMoveTileToRack({ tileId: id, boardPosition, rackIndex: index })
			);
		},
	});

	drop(ref);

	return (
		<Grid item className={classes.tileContainer} ref={ref}>
			{placedTile && tileset && (
				<DraggableTile
					placedTile={placedTile}
					boardVp={boardVp}
					index={index}
					moveTile={moveTile}
					tileset={tileset}
				/>
			)}
		</Grid>
	);
};
