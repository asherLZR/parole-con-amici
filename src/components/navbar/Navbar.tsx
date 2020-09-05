import React from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { NavbarMenu } from './NavMenu';
import { ProfileEmojiAvatar } from '../IconLogo';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useSelector } from 'react-redux';
import { getProfileData } from '../../store/players';

export const NAVBAR_SIZE = '3.5rem';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		position: 'fixed',
		backgroundColor: '#161618',
		zIndex: 1500,
		[theme.breakpoints.up('md')]: {
			width: NAVBAR_SIZE,
			height: '100%',
			flexDirection: 'column',
			'&>*': {
				width: '100%',
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: NAVBAR_SIZE,
			bottom: '0%',
			'&>*': {
				height: '100%',
			},
		},
	},
	logoContainer: {
		[theme.breakpoints.up('md')]: {
			height: '10%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	menu: {
		[theme.breakpoints.up('md')]: {
			height: '90%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '70%',
		},
	},
}));

const LOGO_SIZE = 1.5;

export const Navbar = () => {
	const classes = useStyles();
	const profile = useSelector(getProfileData);

	return (
		<Grid container component='nav' className={classes.root}>
			<Grid
				item
				container
				justify='center'
				alignItems='center'
				className={classes.logoContainer}
			>
				<Link to={ROUTES.home.path}>
					<ProfileEmojiAvatar emoji={profile?.emoji} size={LOGO_SIZE} />
				</Link>
			</Grid>
			<Grid item className={classes.menu}>
				<NavbarMenu />
			</Grid>
		</Grid>
	);
};
