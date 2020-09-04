import React, { useEffect } from 'react';
import {
	makeStyles,
	Theme,
	Grid,
	AvatarProps,
	Avatar,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileData, handleGetProfile } from '../store/players';
import { hexToEmoji } from '../utilities/hex-to-emoji';
import { getUsername } from '../utilities/local-storage';

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
	avatar: {
		backgroundColor: theme.palette.secondary.dark,
	},
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

export const ProfileEmojiAvatar = ({ size, ...rest }: Props & AvatarProps) => {
	const classes = useStyles(size);
	const profile = useSelector(getProfileData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleGetProfile(getUsername()));
	}, [dispatch]);

	if (!profile?.emoji) {
		return <IconLogoAvatar size={size} />;
	}

	return (
		<Avatar {...rest} className={classes.avatar}>
			<span role='img' className={classes.emoji}>
				{hexToEmoji(profile.emoji)}
			</span>
		</Avatar>
	);
};
