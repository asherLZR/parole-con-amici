import { GameData, OpponentState } from "../types/GameTypes";

export const getSortedPlayers = (gameData: GameData) => {
	return gameData.opponents
		.concat({
			username: gameData.username,
			score: gameData.score,
			turnOrder: gameData.turnOrder,
		} as OpponentState)
		.sort((a, b) => a.turnOrder - b.turnOrder);
};
