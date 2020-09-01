import { DB_NAMES, COLLECTIONS } from '../db/constants';
import { getConnectedClient } from '../db/client';

/**
 * USE WITH CARE!!!
 */
export const dropGames = async () => {
	const client = await getConnectedClient();
	const session = client.startSession();

	try {
		await session.withTransaction(async () => {
			const gamesRes = await client
				.db(DB_NAMES.GAME_DB)
				.collection(COLLECTIONS.GAME_DB.GAMES)
				.deleteMany({}, { session });
			console.log(`drop: GAMES - ${gamesRes.result.ok}`);

			const statesRes = await client
				.db(DB_NAMES.GAME_DB)
				.collection(COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
				.deleteMany({}, { session });
			console.log(`drop: GAME_PLAYER_STATES - ${statesRes.result.ok}`);

			const playerRes = await client
				.db(DB_NAMES.PLAYER_DB)
				.collection(COLLECTIONS.PLAYER_DB.PLAYER)
				.updateMany({}, { $set: { gameIds: [] } }, { session });
			console.log(`drop: PLAYER - ${playerRes.result.ok}`);
		});
	} finally {
		session.endSession();
	}
};
