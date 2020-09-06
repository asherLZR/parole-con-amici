import React from 'react';
import {
	makeStyles,
	Theme,
	Grid,
	AvatarProps,
	Avatar,
} from '@material-ui/core';
import { hexToEmoji } from '../utilities/hex-to-emoji';

const useStyles = makeStyles<Theme, number>(theme => ({
	root: {
		position: 'relative',
		width: 'fit-content',
	},
	thinking: {
		fontSize: size => `${size}rem`,
		lineHeight: 0,
	},
	pencil: size => {
		return {
			fontSize: `${0.5 * size}rem`,
			lineHeight: 0,
			top: `${0.55 * size}rem`,
			position: 'absolute',
			left: `${0.75 * size}rem`,
		};
	},
	avatar: size => ({
		backgroundColor: theme.palette.secondary.dark,
		width: `${size * 1.7}rem`,
		height: `${size * 1.7}rem`,
	}),
	emoji: {
		fontSize: size => `${size}rem`,
	},
}));

interface Props {
	size: number;
}

export const IconLogo = ({ size }: Props) => {
	const classes = useStyles(size);

	return (
		<Grid container className={classes.root}>
			<span role='img' aria-label='thinking-emoji' className={classes.thinking}>
				🤔️
			</span>
			<span role='img' aria-label='pencil-emoji' className={classes.pencil}>
				✏️
			</span>
		</Grid>
	);
};

export const IconLogoAvatar = ({ size, ...rest }: Props & AvatarProps) => {
	const classes = useStyles(size);

	return (
		<Avatar {...rest} className={classes.avatar}>
			<IconLogo size={size} />
		</Avatar>
	);
};

export const ProfileEmojiAvatar = ({
	size,
	className,
	emoji,
	...rest
}: Props & AvatarProps & { emoji?: string }) => {
	const classes = useStyles(size);

	if (!emoji) {
		return <IconLogoAvatar size={size} />;
	}

	return (
		<Avatar {...rest} className={`${classes.avatar} ${className}`}>
			<span role='img' className={classes.emoji}>
				{hexToEmoji(emoji)}
			</span>
		</Avatar>
	);
};
