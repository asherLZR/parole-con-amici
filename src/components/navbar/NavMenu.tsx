import React from 'react';
import { ROUTES, RouteInfo } from '../../routes';
import { NavMenuItem } from './NavMenuItem';
import { makeStyles, Theme } from '@material-ui/core';
import { ExitToApp, SvgIconComponent, Face } from '@material-ui/icons';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
		<>
			{routes.map(route => (
				<NavMenuItem
					routeData={route}
					key={route.name}
					className={classes.menuItem}
				/>
			))}
		</>
	);
};
