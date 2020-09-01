import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Theme, makeStyles, CssBaseline } from '@material-ui/core';
import { ROUTES } from './routes';
import { ProtectedHandler } from './components/protected/ProtectedHandler';
import { NAVBAR_SIZE, Navbar } from './components/navbar/Navbar';
import { LinearDeterminate } from './components/LinearProgress';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100vh',
		width: '100%',
		position: 'inherit',
	},
	mainContent: {
		[theme.breakpoints.up('md')]: {
			marginLeft: NAVBAR_SIZE,
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: NAVBAR_SIZE,
		},
		border: '1px solid transparent', // FIXME: format issues
	},
}));

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Switch>
				<Route
					exact
					path={ROUTES.login.path}
					component={ROUTES.login.component}
				/>
				<Route
					exact
					path={ROUTES.logout.path}
					component={ROUTES.logout.component}
				/>
				<Route>
					<Navbar />
					<main className={classes.mainContent}>
						<LinearDeterminate />
						<Route path='*' component={ProtectedHandler} />
					</main>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
