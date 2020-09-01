import React, { FC, useEffect } from 'react';
import { makeStyles, Theme, Grid, IconButton } from '@material-ui/core';
import { Logo } from '../Logo';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useForm } from 'react-hook-form';
import { getUsername, setUsername } from '../../utilities/local-storage';
import { ChevronRightSharp } from '@material-ui/icons';
import { LandingPageTextField } from './LandingPageTextField';

const useStyles = makeStyles<Theme>(() => ({
	root: {
		height: '100vh',
	},
}));

export interface Inputs {
	username: string;
}

export const Landing: FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const username = getUsername();

	const { handleSubmit, control } = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		setUsername(data.username);
	};

	useEffect(() => {
		if (username) {
			history.push(ROUTES.home.path);
		}
	}, [history, username]);

	return (
		<Grid
			container
			justify='center'
			alignContent='center'
			className={classes.root}
		>
			<Logo />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container alignItems='center' spacing={3}>
					<Grid item>
						<LandingPageTextField
							name='username'
							control={control}
							// TODO: validate bad usernames
							rules={{ required: true }}
						/>
					</Grid>
					<Grid item>
						<IconButton type='submit'>
							<ChevronRightSharp style={{ fontSize: '2.5rem' }} />
						</IconButton>
					</Grid>
				</Grid>
			</form>
		</Grid>
	);
};
