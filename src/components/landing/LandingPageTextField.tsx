import { TextField } from '../forms/TextField';
import { withStyles, createStyles, Theme } from '@material-ui/core';

const styles = createStyles((theme: Theme) => ({
	root: {
		'& .MuiInputBase-root': {
			fontSize: '1.3rem',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: theme.palette.common.white,
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				transition: '600ms',
				borderColor: '#45a3e5',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#66bf39',
			},
		},
	},
}));

export const LandingPageTextField = withStyles(styles)(TextField);
