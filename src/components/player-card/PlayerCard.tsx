import React from 'react';
import { makeStyles, Theme, Paper, Grid, Typography } from '@material-ui/core';
import { hexToEmoji, DEFAULT_SMILEY } from '../../utilities/hex-to-emoji';

const useStyles = makeStyles<Theme, { border?: boolean }>((theme: Theme) => ({
	root: ({ border }) => ({
		width: '100%',
		height: '4rem',
		backgroundColor: theme.palette.background.paper,
		borderLeft: `4px solid`,
		borderLeftColor: border ? theme.palette.secondary.dark : 'transparent',
		'&>*': {
			transition: '600ms',
		},
	}),
	container: {
		height: '100%',
		padding: '0.7rem',
	},
	score: {
		'& p': {
			lineHeight: 0,
			fontFamily: '"Teko", sans-serif',
			fontSize: '2.5rem',
		},
	},
	emoji: {
		fontSize: '2rem',
	},
	username: {
		fontSize: '1.2rem',
	},
}));

export interface PlayerCardProps {
	username: string;
	icon?: string;
	score: number;
	border?: boolean;
}

export const PlayerCard = ({
	username,
	icon = DEFAULT_SMILEY,
	score,
	border = false,
}: PlayerCardProps) => {
	const classes = useStyles({ border });

	return (
		<Paper square className={classes.root}>
			<Grid container alignItems='center' className={classes.container}>
				<Grid item xs={3}>
					<span role='img' className={classes.emoji}>
						{icon ? hexToEmoji(icon) : ''}
					</span>
				</Grid>
				<Grid item xs={1} />
				<Grid item xs={5}>
					<Typography color='textPrimary' className={classes.username}>
						{username}
					</Typography>
				</Grid>
				<Grid
					item
					container
					className={classes.score}
					justify='flex-end'
					xs={3}
				>
					<Typography color='textPrimary'>{score}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
