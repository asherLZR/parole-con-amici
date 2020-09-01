import React from 'react';
import Picker from 'emoji-picker-react';
import { useDispatch } from 'react-redux';
import { handlePostProfile } from '../store/players';
import { Grid, makeStyles, Theme } from '@material-ui/core';

interface EmojiObject {
	emoji: string;
	unified: string;
	activeSkinTone: string;
	originalUnified: string;
	names: string[];
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		'&>.emoji-picker-react': {
			background: theme.palette.background.paper,
			border: 'none',
			boxShadow: 'none',
			'& .emoji-categories': {
				backgroundColor: theme.palette.common.white,
			},
			'& .emoji-group::before': {
				backgroundColor: theme.palette.background.paper,
			},
			'& input': {
				color: theme.palette.common.white,
				backgroundColor: 'transparent',
				borderColor: theme.palette.common.white,
			},
		},
	},
}));

export const EmojiPicker = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const onEmojiClick = (_: MouseEvent, emojiObject: EmojiObject) => {
		dispatch(handlePostProfile({ emoji: emojiObject.unified }));
	};

	return (
		<Grid container className={classes.root}>
			<Picker onEmojiClick={onEmojiClick} />
		</Grid>
	);
};
