import React from 'react';
import { makeStyles, Theme, Typography, Paper, Grid } from '@material-ui/core';
import { GameData } from '../../types/GameTypes';
import { getTimeAgo } from '../../utilities/date-helpers';
import { IconImage } from '../Avatar';
import { FLAG_ICONS } from '../../constants/images';

const useStyles = makeStyles<Theme>(theme => ({
	root: {
		width: '83%',
		height: '3rem',
		padding: '0.3rem',
	},
	score: {
		lineHeight: 0,
		fontFamily: '"Teko", sans-serif',
		fontSize: '4rem',
	},
}));

interface Props {
	gameData: GameData;
}

export const GameInfo = ({ gameData }: Props) => {
	const classes = useStyles();
	const { language, dateStarted } = gameData;

	return (
		<Paper square className={classes.root}>
			<Grid container alignItems='center' justify='center'>
				<IconImage iconSrc={FLAG_ICONS[language]} />
				<Typography color='textPrimary' style={{ marginLeft: '0.7rem' }}>
					started <b>{getTimeAgo(dateStarted)}</b>
				</Typography>
			</Grid>
		</Paper>
	);
};
