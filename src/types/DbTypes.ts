import { GamePlayerState, Player, Game, GameData } from './GameTypes';

export interface DbType {
	_id: string;
}

export type DbGameData = GameData & DbType;

export type DbGame = DbType & Game;

export type DbGamePlayerState = DbType & GamePlayerState;

export type DbPlayer = DbType & Player;
