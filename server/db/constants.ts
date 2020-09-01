export enum DB_NAMES {
	GAME_DB = 'game-db',
	PLAYER_DB = 'player-db',
}

export const COLLECTIONS = {
	GAME_DB: {
		GAMES: 'games',
		GAME_PLAYER_STATES: 'game-player-states',
	},
	PLAYER_DB: {
		PLAYER: 'player'
	}
};
