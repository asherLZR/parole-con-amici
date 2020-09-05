import React from 'react';
import { makeStyles, Theme, Typography, Paper, Grid } from '@material-ui/core';
import { GameData } from '../../types/GameTypes';
import { getTimeAgo } from '../../utilities/date-helpers';
import { IconImage } from '../Avatar';
import { FLAG_ICONS } from '../../constants/images';

const useStyles = makeStyles<Theme>(theme => ({
	root: {
		width: '83%',
		height: 'fit-content',
		padding: '0.3rem',
	},
	score: {
		lineHeight: 0,
		fontFamily: '"Teko", sans-serif',
		fontSize: '4rem',
	},
	winnerContainer: {
		marginTop: '0.5rem',
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
		width: '100%',
		borderTop: `2px solid ${theme.palette.common.white}`,
	},
}));

interface Props {
	gameData: GameData;
}

export const GameInfo = ({ gameData }: Props) => {
	const classes = useStyles();
	const { language, dateStarted, winner } = gameData;

	return (
		<Paper square className={classes.root}>
			<Typography color='textPrimary'>
				<Grid container alignItems='center' justify='center'>
					<IconImage iconSrc={FLAG_ICONS[language]} />
					<div style={{ marginLeft: '0.7rem' }}>
						started <b>{getTimeAgo(dateStarted)}</b>
					</div>
				</Grid>
				{winner && (
					<Grid container className={classes.winnerContainer} justify='center'>
						<b>{winner}</b>&nbsp;has won
					</Grid>
				)}
			</Typography>
		</Paper>
	);
};
