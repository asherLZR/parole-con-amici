import React, { useState, useRef, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { Character, BLANK_CHAR } from '../../types/TileTypes';
import { DraggableTile } from './DraggableTile';
import { Tile } from './Tile';
import { TileFactoryProps } from './TileFactory';
import { usePrevious } from '../../hooks/use-previous';
import { useDispatch } from 'react-redux';
import { updateTileCharacter } from '../../store/game-data/actions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(1),
			pointerEvents: 'auto',
			width: '15rem',
			backgroundColor: theme.palette.common.black,
		},
		characterTile: {
			cursor: 'pointer',
		},
	})
);

export const PopoverTile = (props: TileFactoryProps) => {
	const classes = useStyles();
	const anchorEl = useRef<HTMLDivElement | null>(null);
	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const { placedTile, boardVp, tileset } = props;
	const prevPlacedTile = usePrevious(placedTile);

	const { boardPosition } = placedTile;
	const prevBoardPosition = prevPlacedTile?.boardPosition;

	const openPopover = () => {
		setOpen(true);
	};

	const closePopover = () => {
		setOpen(false);
	};

	const characterTileOnClick = (character: Character) => () => {
		closePopover();
		if (placedTile.boardPosition) {
			dispatch(
				updateTileCharacter({
					character,
					boardCoords: placedTile.boardPosition,
				})
			);
		}
	};

	// open the popover when the tile is dropped on a new position on the board
	useEffect(() => {
		if (boardPosition && boardPosition !== prevBoardPosition) {
			openPopover();
		}
	}, [boardPosition, prevBoardPosition]);

	return (
		<>
			<div
				style={{ width: 'fit-content' }}
				ref={anchorEl}
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup='true'
				onClick={openPopover}
			>
				<DraggableTile draggable={!open} {...props} />
			</div>
			<Popover
				classes={{
					paper: classes.paper,
				}}
				open={open}
				anchorEl={anchorEl.current}
				disableRestoreFocus
			>
				<Grid container justify='center'>
					{Object.keys(tileset).map(
						character =>
							character !== BLANK_CHAR && (
								<Tile
									key={uuid()}
									className={classes.characterTile}
									onClick={characterTileOnClick(character as Character)}
									character={character as Character}
									boardVp={boardVp}
								/>
							)
					)}
				</Grid>
			</Popover>
		</>
	);
};
