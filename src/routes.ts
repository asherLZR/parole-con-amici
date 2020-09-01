import { Game } from './components/game/Game';
import { Home } from './components/home/Home';
import { LogoutHandler } from './components/protected/LogoutHandler';
import { Landing } from './components/landing/Landing';
import { Profile } from './components/Profile';

export interface RouteInfo {
	name: string;
	routeName: string;
	path: string;
	params?: string;
	component?: React.FC<any>;
}

export const ROUTES: Readonly<Record<string, RouteInfo>> = {
	login: {
		name: 'Login',
		routeName: '',
		path: '/login',
		component: Landing,
	},
	logout: {
		name: 'Logout',
		routeName: 'logout',
		path: '/logout',
		component: LogoutHandler,
	},
	home: {
		name: 'Home',
		routeName: 'home',
		path: '/home',
		component: Home,
	},
	game: {
		name: 'Game',
		routeName: 'game',
		path: '/game',
		params: '/:gameId',
		component: Game,
	},
	profile: {
		name: 'Profile',
		routeName: 'profile',
		path: '/profile',
		component: Profile,
	},
};
