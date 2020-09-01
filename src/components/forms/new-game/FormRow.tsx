import React, { ReactNode } from 'react';
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		width: '100%',
		padding: '0px 1rem',
	},
	labelText: {
		alignSelf: 'center',
		fontWeight: 500,
	},
}));

interface Props {
	label: string;
	formComponent: ReactNode;
}

export const FormRow = ({ label, formComponent }: Props) => {
	const classes = useStyles();

	return (
		<Grid
			item
			container
			justify='center'
			xs={12}
			className={classes.root}
			spacing={4}
		>
			<Grid item container xs={3} justify='flex-end'>
				<Typography className={classes.labelText} color='textPrimary'>
					{label}
				</Typography>
			</Grid>
			<Grid item container xs={9}>
				{formComponent}
			</Grid>
		</Grid>
	);
};
