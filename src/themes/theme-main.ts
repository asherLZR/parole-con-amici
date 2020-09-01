import { createMuiTheme } from '@material-ui/core';

export const themeMain = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#1e1e24',
			paper: '#27272f',
		},
		common: {
			white: '#cccccc',
			black: '#1e1e24',
		},
		primary: {
			main: '#164470',
		},
		secondary: {
			main: '#b95e8f',
			dark: '#a03f69',
		},
		text: {
			primary: '#cccccc',
		},
	},
	typography: {
		fontFamily: '"Roboto", sans-serif',
		h1: {
			fontSize: '2rem',
			fontWeight: 500,
		},
		body1: {
			lineHeight: 1.3,
		},
		button: {
			fontSize: '1rem',
			fontWeight: 500,
			textTransform: 'lowercase',
		},
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'*::-webkit-scrollbar': {
					width: '0.5rem',
				},
				'*::-webkit-scrollbar-track': {
					background: 'transparent',
				},
				'*::-webkit-scrollbar-thumb': {
					background: '#a03f69',
				},
				a: {
					textDecoration: 'none',
				},
			},
		},
	},
});
