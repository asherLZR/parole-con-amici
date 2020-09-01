import { getUsername } from '../../utilities/local-storage';
import { useHistory, Route, Redirect, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ROUTES } from '../../routes';
import io from 'socket.io-client';
import { SocketTypes } from '../../constants/socket';
import { SERVER_URL } from '../../api/fetch';

export const socket = io(SERVER_URL);

export const ProtectedHandler = () => {
	const username = getUsername();
	const history = useHistory();

	useEffect(() => {
		socket.emit(SocketTypes.JOIN, getUsername());
	});

	if (!username) {
		history.push(ROUTES.login.path);
	}

	return (
		<Switch>
			<Route exact path={ROUTES.home.path} component={ROUTES.home.component} />
			<Route
				exact
				path={ROUTES.profile.path}
				component={ROUTES.profile.component}
			/>
			<Route path={ROUTES.game.path} component={ROUTES.game.component} />
			<Redirect to={ROUTES.home.path} />
		</Switch>
	);
};
