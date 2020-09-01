import { DbPlayer } from '../../src/types/DbTypes';
import { Maybe } from '../../src/types/UtilityTypes';
import { getConnectedClient } from '../db/client';
import {
	readAllPlayers,
	updateProfile,
	readOnePlayer,
} from '../db/models/player-db';
import { Profile } from '../../src/types/GameTypes';

export const handleGetAllPlayers = async (): Promise<
	Maybe<Record<string, DbPlayer>>
> => {
	try {
		const client = await getConnectedClient();
		const players = await readAllPlayers(client);
		const playersObject: Record<string, DbPlayer> = {};
		players?.forEach(player => {
			playersObject[player.username] = player;
		});
		return playersObject;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const handleGetProfile = async (
	username: string
): Promise<Maybe<DbPlayer>> => {
	try {
		const client = await getConnectedClient();
		return readOnePlayer(client, username);
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const handleUpdateProfile = async (
	username: string,
	profile: Profile
): Promise<Maybe<DbPlayer>> => {
	try {
		const client = await getConnectedClient();
		return updateProfile(client, username, profile);
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
