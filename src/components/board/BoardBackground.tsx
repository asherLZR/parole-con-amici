import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, Props>(theme => ({
	root: ({ boardVp }) => {
		return {
			width: `${boardVp}vmin`,
			height: `${boardVp}vmin`,
		};
	},
}));

interface Props extends HTMLAttributes<HTMLImageElement> {
	boardVp: number;
}

export const BoardBackground = ({ boardVp, ...props }: Props) => {
	const classes = useStyles({ boardVp });
	return (
		// TODO: extend this to allow different boards
		<img
			alt='board'
			className={classes.root}
			src={require('../../assets/boards/board-dark.png')}
			draggable={false}
			{...props}
		/>
	);
};
