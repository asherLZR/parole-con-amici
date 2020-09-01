import React, { FC } from 'react';
import {
	makeStyles,
	Theme,
	Paper,
	Typography,
	Button,
	Grid,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { usePlayerData } from '../../../hooks/use-player-data';
import { MultipleAutocomplete } from '../MultipleAutocomplete';
import { Language } from '../../../constants/tile-defaults';
import { MIN_PLAYERS, MAX_PLAYERS } from '../../../constants/general';
import { useDispatch } from 'react-redux';
import { handlePostNewGame } from '../../../store/game-data/actions';
import { PostNewGame } from '../../../api/game-api';
import { FLAG_ICONS } from '../../../constants/images';
import { IconRadioGroup } from '../IconRadioGroup';
import { FormRow } from './FormRow';
import { ROUTES } from '../../../routes';
import { useHistory } from 'react-router-dom';
import { getUsername } from '../../../utilities/local-storage';
import { IconSelectOption } from '../IconRadio';

const useStyles = makeStyles<Theme>(() => ({
	root: {
		width: '25rem',
		height: '15rem',
	},
	title: {
		fontFamily: '"Teko", sans-serif',
		fontSize: '2rem',
	},
	container: {
		margin: '0px',
		width: '100%',
		height: '100%',
	},
	submit: {
		marginRight: '1rem',
		marginLeft: 'auto',
	},
}));

export interface Props {
	username: string;
}

const defaultValues: PostNewGame = {
	language: Language.ENGLISH,
	usernames: [],
};

const FLAG_OPTION: IconSelectOption<string>[] = Object.entries(FLAG_ICONS).map(
	([language, icon]) => ({
		icon,
		value: language,
	})
);

export const NewGameForm: FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, control, errors } = useForm<PostNewGame>({
		defaultValues,
	});
	const username = getUsername();
	const dispatch = useDispatch();

	const { allPlayers } = usePlayerData();

	// display all usernames except for the player logged in
	const usernames = Object.values(allPlayers).flatMap(players =>
		players.username !== username ? [players.username] : []
	);

	const onSubmit = (data: PostNewGame) => {
		dispatch(handlePostNewGame(data));
		history.push(ROUTES.game.path);
	};

	return (
		<Paper
			component='form'
			className={classes.root}
			onSubmit={handleSubmit(onSubmit)}
			square
		>
			<Grid
				container
				justify='center'
				alignItems='center'
				alignContent='center'
				className={classes.container}
				spacing={2}
			>
				<Typography className={classes.title} color='textPrimary'>
					Start a new game
				</Typography>
				<FormRow
					label='Players'
					formComponent={
						<MultipleAutocomplete
							name='usernames'
							options={usernames}
							control={control}
							label=''
							rules={{
								validate: (v: string[]) => {
									return (
										v.length >= MIN_PLAYERS - 1 && v.length <= MAX_PLAYERS - 1
									);
								},
							}}
						/>
					}
				/>
				<FormRow
					label='Language'
					formComponent={
						<IconRadioGroup
							name='language'
							register={register}
							options={FLAG_OPTION}
						/>
					}
				/>
				<Button type='submit' className={classes.submit}>
					Let's go!
				</Button>
				{errors.usernames && <p>This field is required</p>}
			</Grid>
		</Paper>
	);
};
