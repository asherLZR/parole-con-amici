import React from 'react';
import { ROUTES, RouteInfo } from '../../routes';
import { NavMenuItem } from './NavMenuItem';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { ExitToApp, SvgIconComponent, Face } from '@material-ui/icons';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		width: '100%',
		height: '100%',
		padding: '0px',
		margin: '0px',
		[theme.breakpoints.up('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
	},
	menuItem: {
		[theme.breakpoints.up('md')]: {
			height: '4rem',
			'&:last-child': {
				marginTop: 'auto',
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '4rem',
		},
	},
}));

const routes: Array<RouteInfo & { icon: SvgIconComponent }> = [
	{ ...ROUTES.profile, icon: Face },
	{ ...ROUTES.logout, icon: ExitToApp },
];

export const NavbarMenu = () => {
	const classes = useStyles();

	return (
		<Grid component='ul' container className={classes.root}>
			{routes.map(route => (
				<NavMenuItem
					routeData={route}
					key={route.name}
					className={classes.menuItem}
				/>
			))}
		</Grid>
	);
};
