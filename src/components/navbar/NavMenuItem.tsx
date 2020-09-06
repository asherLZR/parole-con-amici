import React, { FC } from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { RouteInfo } from '../../routes';
import { SvgIconComponent } from '@material-ui/icons';

const useStyles = makeStyles<Theme>((theme: Theme) => {
	const transition = '600ms';

	return {
		root: {
			listStyleType: 'none',
			width: '100%',
			transition,
			'&:hover': {
				'& svg': {
					fill: theme.palette.common.white,
				},
			},
		},
		icon: {
			fontSize: '2rem',
			fill: '#4e4e4e',
			transition,
		},
		link: {
			width: '100%',
			textDecoration: 'none',
			[theme.breakpoints.up('md')]: {
				borderLeftStyle: 'solid',
				borderLeftWidth: '2px',
				borderLeftColor: 'transparent',
			},
			[theme.breakpoints.down('sm')]: {
				borderBottomStyle: 'solid',
				borderBottomWidth: '2px',
				borderBottomColor: 'transparent',
			},
			transition,
		},
		linkName: {
			color: theme.palette.text.primary,
			marginLeft: '1rem',
		},
		linkActive: {
			'& svg': {
				fill: theme.palette.common.white,
			},
			borderColor: theme.palette.common.white,
		},
	};
});

export interface Props {
	routeData: RouteInfo & { icon: SvgIconComponent };
	className: string;
}

export const NavMenuItem: FC<Props> = ({ routeData, className }: Props) => {
	const classes = useStyles();
	const { icon: Icon, path } = routeData;

	return (
		<Grid
			item
			container
			className={`${classes.root} ${className}`}
			justify='center'
		>
			<NavLink
				to={path}
				className={classes.link}
				activeClassName={classes.linkActive}
			>
				<Grid
					container
					style={{ height: '100%' }}
					alignItems='center'
					justify='center'
					wrap='nowrap'
				>
					<Icon className={classes.icon} />
				</Grid>
			</NavLink>
		</Grid>
	);
};
