import React, { FC } from 'react';
import { makeStyles, Theme, Grid, GridProps } from '@material-ui/core';
import { calculateSquareVp } from '../../constants/board-sizes';
import { Character } from '../../types/TileTypes';

const useStyles = makeStyles<Theme, { boardVp: number }>(theme => ({
	root: ({ boardVp }) => {
		return {
			width: `${calculateSquareVp(boardVp)}vmin`,
			height: `${calculateSquareVp(boardVp)}vmin`,
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.dark,
			border: 'solid',
			borderWidth: '1px',
			zIndex: 1,
			fontFamily: theme.typography.body1.fontFamily,
			color: theme.palette.text.primary,
			opacity: 0.8,
			transition: '600ms',
			'&:hover': {
				opacity: 0.3,
			},
		};
	},
	character: ({ boardVp }) => {
		return {
			margin: '0px',
			fontSize: `${calculateSquareVp(boardVp) * 0.7}vmin`,
			textTransform: 'uppercase',
			fontWeight: 'bold',
		};
	},
	score: ({ boardVp }) => {
		return {
			position: 'relative',
			top: '40%',
			left: '10%',
			margin: '0px',
			fontSize: `${calculateSquareVp(boardVp) * 0.25}vmin`,
			height: 'fit-content',
		};
	},
}));

interface Props extends GridProps {
	character?: Character;
	score?: number;
	className?: string;
	boardVp: number;
}

export const Tile: FC<Props> = ({
	character,
	score,
	className = '',
	boardVp,
	...props
}: Props) => {
	const classes = useStyles({ boardVp });

	return (
		<Grid
			container
			justify='center'
			alignContent='center'
			className={`${className} ${classes.root}`}
			data-testid='tile'
			{...props}
		>
			{character && <p className={classes.character}>{character}</p>}
			{score && <p className={classes.score}>{score}</p>}
		</Grid>
	);
};
