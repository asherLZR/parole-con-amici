import React, { ReactNode } from 'react';
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles<Theme>(() => ({
	root: {
		width: '100%',
		padding: '0px 1rem',
	},
	labelText: {
		alignSelf: 'center',
		fontWeight: 500,
		fontSize: '0.9rem',
		marginBottom: '0.5rem',
	},
}));

interface Props {
	label: string;
	formComponent: ReactNode;
}

export const FormRow = ({ label, formComponent }: Props) => {
	const classes = useStyles();

	return (
		<Grid item container xs={12} className={classes.root}>
			<Typography className={classes.labelText} color='textPrimary'>
				{label}
			</Typography>
			{formComponent}
		</Grid>
	);
};
