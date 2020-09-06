import React from 'react';
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
	fab: {
		backgroundColor: theme.palette.secondary.dark,
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
}));

export const NewGameFab = (props: GridProps) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Grid {...props}>
			<Fab size='small' onClick={handleClick} className={classes.fab}>
				<AddIcon />
			</Fab>
			<Popover
				open={open}
				onClose={handleClose}
				disableRestoreFocus
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<NewGameForm />
			</Popover>
		</Grid>
	);
};
