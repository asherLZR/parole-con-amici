import React from 'react';
import { makeStyles, Theme, Chip as MuiChip, Avatar } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({}));

interface Props {
	label: string;
}

export const Chip = ({ label }: Props) => {
	const classes = useStyles();

	const handleDelete = () => {
		alert('hello');
	};

	return (
		<MuiChip
			avatar={<Avatar>M</Avatar>}
			label={label}
			clickable
			color='primary'
			onDelete={handleDelete}
		/>
	);
};
