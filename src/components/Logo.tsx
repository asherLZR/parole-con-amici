import React, { FC } from 'react';
import { makeStyles, Theme, Grid, GridProps } from '@material-ui/core';
import { IconLogo } from './IconLogo';

const useStyles = makeStyles<Theme>(theme => ({
	root: {
		textAlign: 'center',
	},
	'@keyframes textColor': {
		'0%': {
			color: '#45a3e5',
		},
		'30%': {
			color: '#66bf39',
		},
		'60%': {
			color: '#eb670f',
		},
		'90%': {
			color: '#f35',
		},
		'100%': {
			color: '#864cbf',
		},
	},
	text: {
		fontFamily: '"Teko", sans-serif',
		fontSize: '5rem',
		whiteSpace: 'pre-line',
		lineHeight: '4.5rem',
		marginRight: '1rem',
		animationName: '$textColor',
		animationDuration: '5s',
		animationDirection: 'alternate',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
}));

const LOGO_SIZE = 6;

export const Logo: FC<GridProps> = props => {
	const classes = useStyles();

	return (
		<Grid
			container
			className={classes.root}
			justify='center'
			alignItems='center'
			{...props}
		>
			<p className={classes.text}>
				{`Parole
				Con
				Amici`}
			</p>
			<IconLogo size={LOGO_SIZE} />
		</Grid>
	);
};
