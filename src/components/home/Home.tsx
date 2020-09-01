import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { GamePreviewCollection } from './GamePreviewCollection';
import { NewGameFab } from './NewGameFab';

const useStyles = makeStyles<Theme>(theme => ({
	root: {
		// border: '1px solid red',
	},
	container: {
		width: '90%',
		height: '-webkit-fill-available',
		padding: '1rem',
	},
	fab: {
		position: 'fixed',
		right: '1.5rem',
		bottom: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			bottom: '5rem',
		},
	},
}));

export const Home = () => {
	const classes = useStyles();

	return (
		<Grid container justify='center' className={classes.root}>
			<Grid
				container
				alignItems='center'
				justify='center'
				className={classes.container}
			>
				<Grid item xs={12}>
					<GamePreviewCollection />
				</Grid>
				<NewGameFab className={classes.fab} />
			</Grid>
		</Grid>
	);
};
