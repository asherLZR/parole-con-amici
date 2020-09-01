import { useDispatch } from 'react-redux';
import { showProgress, hideProgress } from '../store/progress-bar';
import { useEffect } from 'react';

export const useProgress = (isPending: boolean) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (isPending) {
			dispatch(showProgress());
		} else {
			dispatch(hideProgress());
		}
	}, [isPending, dispatch]);
};
