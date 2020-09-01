import { MongoClient } from 'mongodb';
import { Maybe } from '../../../src/types/UtilityTypes';
import { DbPlayer } from '../../../src/types/DbTypes';
import { DB_NAMES, COLLECTIONS } from '../constants';
import { Profile } from '../../../src/types/GameTypes';

export const readOnePlayer = async (
	client: MongoClient,
	username: string
): Promise<Maybe<DbPlayer>> => {
	return client
		.db(DB_NAMES.PLAYER_DB)
		.collection(COLLECTIONS.PLAYER_DB.PLAYER)
		.findOne({ username });
};

export const readAllPlayers = async (
	client: MongoClient
): Promise<Maybe<DbPlayer[]>> => {
	return client
		.db(DB_NAMES.PLAYER_DB)
		.collection(COLLECTIONS.PLAYER_DB.PLAYER)
		.find({})
		.toArray();
};

export const updateProfile = async (
	client: MongoClient,
	username: string,
	profile: Profile
): Promise<Maybe<DbPlayer>> => {
	const res = await client
		.db(DB_NAMES.PLAYER_DB)
		.collection(COLLECTIONS.PLAYER_DB.PLAYER)
		.findOneAndUpdate(
			{ username },
			{ $set: { emoji: profile.emoji } },
			{ returnOriginal: false }
		);
	return res.value;
};
