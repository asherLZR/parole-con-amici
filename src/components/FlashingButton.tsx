import React from 'react';
import {
	withStyles,
	createStyles,
	IconButton as MuiIconButton,
	WithStyles,
	IconButtonProps,
} from '@material-ui/core';

const styles = createStyles({
	'@keyframes blinker': {
		from: { opacity: 1 },
		to: { opacity: 0 },
	},
	blinkingIcon: {
		animationName: '$blinker',
		animationDuration: '2s',
		animationDirection: 'alternate',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
});

const IconButton = ({
	classes,
	className,
	disabled,
	children,
	...rest
}: WithStyles<typeof styles> & IconButtonProps) => {
	return (
		<MuiIconButton
			className={`${className} ${disabled ? '' : classes.blinkingIcon}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</MuiIconButton>
	);
};

export const FlashingIconButton = withStyles(styles)(IconButton);
