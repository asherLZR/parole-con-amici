import React, { FC, useEffect } from 'react';
import {
	makeStyles,
	Theme,
	Grid,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { Logo } from '../Logo';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useForm } from 'react-hook-form';
import { ChevronRightSharp } from '@material-ui/icons';
import { LandingPageTextField } from './LandingPageTextField';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleGetProfile,
	getProfileData,
	getProfileError,
	getProfileIsPending,
} from '../../store/players';

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
	const profile = useSelector(getProfileData);
	const loginError = useSelector(getProfileError);
	const isPending = useSelector(getProfileIsPending);
	const dispatch = useDispatch();

	const { handleSubmit, control, errors } = useForm<Inputs>();
	const onSubmit = ({ username }: Inputs) => {
		dispatch(handleGetProfile(username));
	};

	useEffect(() => {
		if (profile) {
			history.push(ROUTES.home.path);
		}
	}, [history, profile]);

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
							rules={{
								required: { value: true, message: 'Username is required' },
								pattern: {
									value: /^[A-Za-z0-9-]+$/i,
									message: 'Must not contain special characters',
								},
							}}
							error={!!errors.username}
							label={errors.username?.message ?? ''}
						/>
					</Grid>
					<Grid item>
						<IconButton type='submit' disabled={isPending}>
							{isPending ? (
								<CircularProgress
									style={{ width: '2.5rem', height: '2.5rem' }}
									color='secondary'
								/>
							) : (
								<ChevronRightSharp style={{ fontSize: '2.5rem' }} />
							)}
						</IconButton>
					</Grid>
				</Grid>
				<br />
				<div style={{ height: '1rem' }}>
					<b>{loginError ? 'Incorrect username 😥' : ''}</b>
				</div>
			</form>
		</Grid>
	);
};
