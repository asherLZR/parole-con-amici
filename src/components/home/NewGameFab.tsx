import React, { useState } from 'react';
import {
	makeStyles,
	Theme,
	Fab,
	Popover,
	GridProps,
	Grid,
} from '@material-ui/core';
import { NewGameForm } from '../forms/new-game/NewGameForm';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles<Theme>(theme => ({
	root: {
		top: '50% !important',
		left: '60% !important',
		transform: 'translate(-50%, -50%)',
	},
	fab: {
		backgroundColor: theme.palette.secondary.dark,
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
}));

export const NewGameFab = (props: GridProps) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);

	const openPopover = () => {
		setOpen(true);
	};

	const closePopover = () => {
		setOpen(false);
	};

	return (
		<Grid {...props}>
			<Fab size='small' onClick={openPopover} className={classes.fab}>
				<AddIcon />
			</Fab>
			<Popover
				classes={{
					root: classes.root,
					paper: classes.paper,
				}}
				open={open}
				onClose={closePopover}
				disableRestoreFocus
				anchorReference='none'
			>
				<NewGameForm />
			</Popover>
		</Grid>
	);
};
