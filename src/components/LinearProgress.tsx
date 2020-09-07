import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress as MuiLinearProgress } from '@material-ui/core';
import { getIsLoading } from '../store/progress-bar';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		width: '100%',
		height: '6px', // height of LinearProgress
		zIndex: 1000
	},
});

export const LinearDeterminate = () => {
	const classes = useStyles();

	const isLoading = useSelector(getIsLoading);

	return (
		<div className={classes.root}>
			{isLoading && (
				<MuiLinearProgress color={'secondary'} variant='indeterminate' />
			)}
		</div>
	);
};
