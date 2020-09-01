import { combineReducers, Action } from 'redux';
import { reducer as ProgressBar } from './progress-bar';
import { reducer as GameData } from './game-data/reducer';
import { reducer as ActiveGame } from './active-game';
import { reducer as Players } from './players';
import { reducer as Confetti } from './confetti';
import { reducer as Games } from './games';

// used to reset the state of the store
export const USER_LOGOUT = 'USER_LOGOUT';

export const AppReducer = combineReducers({
	ProgressBar,
	GameData,
	ActiveGame,
	Players,
	Confetti,
	Games,
});

export const RootReducer = (state: any, action: Action) => {
	return AppReducer(action.type === USER_LOGOUT ? undefined : state, action);
};

export type AppReducer = ReturnType<typeof AppReducer>;
export type RootState = ReturnType<typeof RootReducer>;
