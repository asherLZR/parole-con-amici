import React, { FC, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { BoardSquare } from '../square/BoardSquare';
import { Maybe } from '../../types/UtilityTypes';
import { PlacedTile, BoardCoords } from '../../types/GameTypes';
import { SQUARES_PER_SIDE } from '../../constants/board-sizes';
import { times } from 'lodash';
import { Tiles } from '../../types/TileTypes';

const useStyles = makeStyles<Theme, { boardVp: number }>((theme: Theme) => ({
	root: {
		border: ({ boardVp }) =>
			`${boardVp * 0.02}vmin solid ${theme.palette.primary.dark}`,
	},
	board: ({ boardVp }) => {
		return {
			position: 'relative',
			width: `${boardVp}vmin`,
			height: `${boardVp}vmin`,
			display: 'flex',
			flexWrap: 'wrap',
			alignContent: 'flex-start',
			userDrag: 'none',
		};
	},
}));

interface Props {
	board?: Maybe<PlacedTile>[][];
	boardVp: number;
	tileset: Tiles;
}

/**
 * TODO: convert this to BoardWithTiles
 * Expensive to build board as it creates 15 * 15 tiles - use BoardWithTiles instead for better performance
 */
export const Board: FC<Props> = React.memo(
	({ board, boardVp, tileset }: Props) => {
		const classes = useStyles({ boardVp });

		// drop only if the square is empty
		const canDrop = useCallback(
			({ row, col }: BoardCoords) => {
				return board ? !board[row][col] : false;
			},
			[board]
		);

		return (
			<div className={classes.root}>
				<div className={classes.board}>
					{times(SQUARES_PER_SIDE).map(i => {
						return times(SQUARES_PER_SIDE).map(j => {
							const placedTile = board ? board[i][j] : null;

							return (
								<BoardSquare
									key={`${i}-${j}`}
									position={{
										row: i,
										col: j,
									}}
									placedTile={placedTile}
									canDrop={canDrop}
									boardVp={boardVp}
									tileset={tileset}
								/>
							);
						});
					})}
				</div>
			</div>
		);
	}
);
