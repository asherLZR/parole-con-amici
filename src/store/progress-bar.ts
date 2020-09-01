import { createAction, createReducer } from '@reduxjs/toolkit';
import { RootState } from './root-reducer';

export const getIsLoading = (state: RootState) => state.ProgressBar.isLoading;

export const showProgress = createAction('SHOW_PROGRESS');
export const hideProgress = createAction('HIDE_PROGRESS');

export interface ProgressState {
	isLoading: boolean;
}

const initialState: ProgressState = {
	isLoading: false,
};

export const reducer = createReducer(initialState, builder => {
	builder.addCase(showProgress, () => {
		return { isLoading: true };
	});

	builder.addCase(hideProgress, () => {
		return { ...initialState };
	});
});
