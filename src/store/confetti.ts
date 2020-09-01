import {
	createReducer,
	createAction,
} from '@reduxjs/toolkit';
import { RootState } from './root-reducer';

/**Selectors */
export const getConfettiState = (state: RootState) => state.Confetti.confettiOn;

/**Actions */
export const startConfetti = createAction('START_CONFETTI');
export const endConfetti = createAction('END_CONFETTI');

/**Reducer */
export interface ConfettiState {
	confettiOn: boolean;
}

const initialState: ConfettiState = {
	confettiOn: false,
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(startConfetti, () => {
		return { confettiOn: true };
	});

	builder.addCase(endConfetti, () => {
		return { confettiOn: false };
	});
});
