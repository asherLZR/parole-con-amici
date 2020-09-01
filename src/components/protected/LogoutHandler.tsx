import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { clearStorage } from '../../utilities/local-storage';
import { USER_LOGOUT } from '../../store/root-reducer';

export const LogoutHandler = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	clearStorage();

	useEffect(() => {
		dispatch({ type: USER_LOGOUT });
		history.push(ROUTES.login.path);
	}, [dispatch, history]);

	return <div></div>;
};
