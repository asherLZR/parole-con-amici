// import { getConnectedClient } from '../db/client';
// import {
// 	mockGameId,
// 	mockGame,
// 	mockGamePlayerState,
// 	mockGamePlayerStateId,
// 	mockPlayer1,
// 	mockPlayer2,
// } from '../../src/test/mock';
// import { MongoClient, UpdateWriteOpResult, ObjectId } from 'mongodb';
// import { DB_NAMES, COLLECTIONS } from '../db/constants';
// import { produce } from 'immer';
// import { DbPlayer } from '../../src/types/DbTypes';

// const updateGameWithMock = async (
// 	client: MongoClient,
// 	gameId: string
// ): Promise<UpdateWriteOpResult> => {
// 	const game = produce(mockGame, draft => {
// 		delete draft._id;
// 		delete draft.dateStarted;
// 	});

// 	const res = await client
// 		.db(DB_NAMES.GAME_DB)
// 		.collection(COLLECTIONS.GAME_DB.GAMES)
// 		.updateOne(
// 			{ shortId: gameId },
// 			{
// 				$set: game,
// 				$currentDate: { dateStarted: { $type: 'date' } },
// 			}
// 		);
// 	console.log('Updated game with mock');
// 	return res;
// };

// const updateGamePlayerStateWithMock = async (
// 	client: MongoClient,
// 	gamePlayerStateId: string
// ): Promise<UpdateWriteOpResult> => {
// 	const gamePlayerState = produce(mockGamePlayerState, draft => {
// 		delete draft._id;
// 	});

// 	const res = await client
// 		.db(DB_NAMES.GAME_DB)
// 		.collection(COLLECTIONS.GAME_DB.GAME_PLAYER_STATES)
// 		.updateOne(
// 			{ _id: new ObjectId(gamePlayerStateId) },
// 			{ $set: gamePlayerState }
// 		);

// 	console.log('Updated game player state with mock');
// 	return res;
// };

// const updatePlayerWithMock = async (
// 	client: MongoClient,
// 	mockPlayer: DbPlayer
// ): Promise<UpdateWriteOpResult> => {
// 	const player = produce(mockPlayer, draft => {
// 		delete draft._id;
// 	});

// 	const res = await client
// 		.db(DB_NAMES.PLAYER_DB)
// 		.collection(COLLECTIONS.PLAYER_DB.PLAYER)
// 		.updateOne({ _id: new ObjectId(mockPlayer._id) }, { $set: player });

// 	console.log(`Updated player ${player.username} with mock`);
// 	return res;
// };

// export const updateMock = async () => {
// 	try {
// 		const client = await getConnectedClient();
// 		await updateGameWithMock(client, mockGameId);
// 		await updateGamePlayerStateWithMock(client, mockGamePlayerStateId);
// 		updatePlayerWithMock(client, mockPlayer1);
// 		updatePlayerWithMock(client, mockPlayer2);
// 	} catch (e) {
// 		console.error(e);
// 	}
// };
