import React, { ImgHTMLAttributes } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	icon: {
		width: '2.3rem',
		height: '2.3rem',
	},
}));

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
	iconSrc: string;
}

export const IconImage = ({ iconSrc, ...props }: Props) => {
	const classes = useStyles();
	const icon = require(`../assets/${iconSrc}`);

	return <img {...props} src={icon} alt='avatar' className={classes.icon} />;
};
