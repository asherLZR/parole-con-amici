import React, { FC, useRef } from 'react';
import { BoardCoords, PlacedTile } from '../../types/GameTypes';
import { Square } from './Square';
import { useDispatch } from 'react-redux';
import { Maybe } from '../../types/UtilityTypes';
import { BoardStar } from './BoardStar';
import { StarLocations, StarType } from '../../constants/tile-defaults';
import { toIndex } from '../../utilities/board-helpers';
import { makeStyles, Theme } from '@material-ui/core';
import { handleMoveTileToBoard } from '../../store/game-data/actions';
import { TileFactory } from '../tile/TileFactory';
import { DragTileItem } from '../tile/DraggableTile';
import { useDrop } from 'react-dnd';
import { DraggableType } from '../../types/DraggableTypes';
import { Tiles } from '../../types/TileTypes';

const useStyles = makeStyles<Theme, { starType: Maybe<StarType> }>(theme => ({
	root: {
		backgroundColor: ({ starType }) =>
			starType === StarType.Central
				? theme.palette.secondary.dark
				: theme.palette.common.black,
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
}));

export interface Props {
	position: BoardCoords;
	placedTile: Maybe<PlacedTile>;
	canDrop: (position: BoardCoords) => boolean;
	boardVp: number;
	tileset: Tiles;
}

export const BoardSquare: FC<Props> = ({
	position,
	placedTile,
	canDrop,
	boardVp,
	tileset,
}: Props) => {
	const starType = StarLocations.get(toIndex(position));
	const dispatch = useDispatch();
	const classes = useStyles({ starType });
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: DraggableType.TILE,
		canDrop: () => canDrop(position),
		drop: (item: DragTileItem) => {
			const { id, boardPosition } = item;
			dispatch(
				handleMoveTileToBoard({
					tileId: id,
					boardPosition,
					nextPosition: position,
				})
			);
		},
	});

	drop(ref);

	return (
		<Square boardVp={boardVp} className={classes.root} ref={ref}>
			{placedTile && (
				<TileFactory
					placedTile={placedTile}
					className={classes.absolute}
					boardVp={boardVp}
					tileset={tileset}
				/>
			)}
			{starType && (
				<BoardStar
					starType={starType}
					boardVp={boardVp}
					starClassName={classes.absolute}
				/>
			)}
		</Square>
	);
};
