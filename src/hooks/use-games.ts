import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	handleGetPlayersGames,
	getIsPending,
	getAllGameData,
} from '../store/games';

export const useGames = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleGetPlayersGames());
	}, [dispatch]);

	return {
		games: useSelector(getAllGameData),
		isPending: useSelector(getIsPending),
	};
};
