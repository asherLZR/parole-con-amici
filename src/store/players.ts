import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Player, Profile } from '../types/GameTypes';
import { getAllPlayers, postProfile, getProfile } from '../api/player-api';
import { RootState } from './root-reducer';

/**Selectors */
export const getAllPlayersData = (state: RootState) => state.Players.players;
export const getProfileData = (state: RootState) => state.Players.profile;

/**Actions */
export const handleGetAllPlayers = createAsyncThunk<Record<string, Player>>(
	'GET_ALL_PLAYERS',
	getAllPlayers
);

export const handleGetProfile = createAsyncThunk<Profile>(
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
}

const initialState: PlayerState = {
	players: {},
	profile: undefined,
	isPending: false,
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
	});

	builder.addCase(handleGetProfile.rejected, state => {
		state.isPending = false;
	});
});
