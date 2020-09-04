import { createReducer, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { Player, Profile } from '../types/GameTypes';
import { getAllPlayers, postProfile, getProfile } from '../api/player-api';
import { RootState } from './root-reducer';
import { setUsername } from '../utilities/local-storage';

/**Selectors */
export const getAllPlayersData = (state: RootState) => state.Players.players;
export const getProfileData = (state: RootState) => state.Players.profile;
export const getProfileError = (state: RootState) => state.Players.error;
export const getProfileIsPending = (state: RootState) => state.Players.isPending;

/**Actions */
export const handleGetAllPlayers = createAsyncThunk<Record<string, Player>>(
	'GET_ALL_PLAYERS',
	getAllPlayers
);

export const handleGetProfile = createAsyncThunk<Profile, string>(
	'GET_PROFILE',
	getProfile
);

export const handlePostProfile = createAsyncThunk<Profile, Profile>(
	'POST_PROFILE',
	postProfile
);

/**Reducer */
export interface PlayerState {
	players: Record<string, Player>;
	profile?: Profile;
	isPending: boolean;
	error?: SerializedError;
}

const initialState: PlayerState = {
	players: {},
	profile: undefined,
	isPending: false,
	error: undefined,
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(handleGetAllPlayers.pending, state => {
		state.isPending = true;
	});

	builder.addCase(handleGetAllPlayers.fulfilled, (state, action) => {
		state.players = action.payload;
		state.isPending = false;
	});

	builder.addCase(handleGetAllPlayers.rejected, state => {
		state.isPending = false;
	});

	builder.addCase(handlePostProfile.pending, state => {
		state.isPending = true;
	});

	builder.addCase(handlePostProfile.fulfilled, (state, action) => {
		state.profile = action.payload;
		state.isPending = false;
	});

	builder.addCase(handlePostProfile.rejected, state => {
		state.isPending = false;
	});

	builder.addCase(handleGetProfile.pending, state => {
		state.isPending = true;
	});

	builder.addCase(handleGetProfile.fulfilled, (state, action) => {
		state.profile = action.payload;
		state.isPending = false;
		setUsername(action.meta.arg);
	});

	builder.addCase(handleGetProfile.rejected, (state, action) => {
		state.error = action.error;
		state.isPending = false;
	});
});
