import { useSelector, useDispatch } from 'react-redux';
import { getAllPlayersData, handleGetAllPlayers } from '../store/players';
import { useEffect } from 'react';

export const usePlayerData = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleGetAllPlayers());
	}, [dispatch]);

	return {
		allPlayers: useSelector(getAllPlayersData),
	};
};
