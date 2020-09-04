import { Player, Profile } from '../types/GameTypes';
import { getUsername } from '../utilities/local-storage';
import { fetchApi } from './fetch';

export const getAllPlayers = (): Promise<Record<string, Player>> => {
	return fetchApi(`/players`).then(res => res.json());
};

export const postProfile = (profile: Profile): Promise<Profile> => {
	return fetchApi(`/player/${getUsername()}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ profile }),
	}).then(res => res.json());
};

export const getProfile = (username: string): Promise<Profile> => {
	return fetchApi(`/player/${username}`).then(res => res.json());
};
