import React, { FC, useRef } from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { BLANK_CHAR } from '../../types/TileTypes';
import { Tile } from './Tile';
import { TileFactoryProps } from './TileFactory';
import { DraggableType } from '../../types/DraggableTypes';
import { useDrag, XYCoord, useDrop, DropTargetMonitor } from 'react-dnd';
import { BoardCoords } from '../../types/GameTypes';

const useStyles = makeStyles<Theme, boolean>(theme => ({
	root: dragging => {
		return {
			// opacity: dragging ? 0 : 1,
			backgroundColor: theme.palette.secondary.main,
			borderColor: theme.palette.secondary.dark,
			cursor: 'pointer',
		};
	},
}));

type Props = TileFactoryProps & {
	index?: number;
	moveTile?: (dragIndex: number, hoverIndex: number) => void;
};

export interface DragTileItem {
	index: number;
	id: number;
	type: string;
	boardPosition?: BoardCoords;
}

export const DraggableTile: FC<Props> = ({
	placedTile,
	draggable = true,
	className = '',
	index = undefined,
	tileset,
	moveTile = () => {},
	...props
}: Props) => {
	const { character, id, boardPosition } = placedTile;
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: DraggableType.TILE,
		hover(item: DragTileItem, monitor: DropTargetMonitor) {
			// TODO: allow hover behaviour if the tile is already on the board
			if (!ref.current || item.boardPosition) {
				return;
			}
			const dragIndex = item.index;

			const hoverIndex = index ?? 0;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get horizontal middle
			const hoverMiddleX =
				(hoverBoundingRect.right - hoverBoundingRect.left) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the left
			const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return;
			}

			moveTile(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: DraggableType.TILE, id, index, boardPosition },
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const classes = useStyles(isDragging);

	drag(drop(ref));

	const displayChar = character === BLANK_CHAR ? undefined : character;
	const displayPoints = placedTile.isBlank
		? undefined
		: tileset[character].points;

	const opacity = isDragging ? 0 : 1;

	return (
		<Grid
			draggable={draggable}
			className={className}
			style={{ zIndex: 1, opacity }}
			ref={ref}
		>
			<Tile
				character={displayChar}
				score={displayPoints}
				className={classes.root}
				{...props}
			/>
		</Grid>
	);
};
