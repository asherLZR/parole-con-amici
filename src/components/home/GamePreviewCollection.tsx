import React from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { useGames } from '../../hooks/use-games';
import { useProgress } from '../../hooks/use-progress';
import { GamePreview } from './GamePreview';
import { usePlayerData } from '../../hooks/use-player-data';

const useStyles = makeStyles<Theme>(() => ({
	root: {
		// border: '1px solid yellow',
		'&>*': {
			// border: '1px solid red',
		},
	},
}));

export const GamePreviewCollection = () => {
	const classes = useStyles();
	const { games, isPending } = useGames();
	const { allPlayers } = usePlayerData();

	useProgress(isPending);

	return (
		<Grid container alignItems='center' className={classes.root}>
			{Object.values(games).map((game, i) => {
				return (
					<Grid key={i} item md={12} lg={6} xl={4}>
						<GamePreview gameData={game.gameData} players={allPlayers} />
					</Grid>
				);
			})}
		</Grid>
	);
};
