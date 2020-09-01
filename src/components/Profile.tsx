import React from 'react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { EmojiPicker } from './EmojiPicker';
import { getUsername } from '../utilities/local-storage';

const useStyles = makeStyles<Theme>(() => ({
	root: { minHeight: '80vh' },
}));

export const Profile = () => {
	const classes = useStyles();
	const username = getUsername();

	return (
		<Grid
			container
			justify='space-around'
			alignItems='center'
			className={classes.root}
		>
			<Grid item sm={12} md={3}>
				<Typography variant='h1' color='textPrimary'>
					{username}
				</Typography>
				<br />
				<EmojiPicker />
			</Grid>
		</Grid>
	);
};
