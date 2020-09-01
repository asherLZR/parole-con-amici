import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { StarType } from '../../constants/tile-defaults';
import { calculateSquareVp } from '../../constants/board-sizes';

const getColor = (starType: StarType, theme: Theme) => {
	switch (starType) {
		case StarType.Central:
			return theme.palette.primary.dark;
		case StarType.DoubleLetter:
		case StarType.DoubleWord:
			return theme.palette.secondary.light;
		case StarType.TripleLetter:
		case StarType.TripleWord:
			return theme.palette.secondary.dark;
		default:
			return '';
	}
};

const useStyles = makeStyles<Theme, Props>(theme => ({
	letter: ({ boardVp, starType }) => {
		return {
			color: getColor(starType, theme),
			fontFamily: theme.typography.body1.fontFamily,
			fontSize: `${calculateSquareVp(boardVp) * 0.5}vmin`,
			fontWeight: 'bold',
		};
	},
	star: ({ boardVp }) => {
		return {
			color: theme.palette.common.black,
			fontSize: `${calculateSquareVp(boardVp)}vmin`,
		};
	},
}));

export interface Props {
	starType: StarType;
	boardVp: number;
	starClassName?: string;
}

export const BoardStar: FC<Props> = (props: Props) => {
	const classes = useStyles(props);
	const starClassName = props.starClassName ?? '';

	return props.starType === StarType.Central ? (
		<Star className={`${classes.star} ${starClassName}`} />
	) : (
		<div className={classes.letter}>{props.starType}</div>
	);
	// return <StarBorder className={classes.root} />;
};
