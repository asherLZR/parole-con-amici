import React from 'react';
import {
	makeStyles,
	Theme,
	TextField,
	TextFieldProps,
} from '@material-ui/core';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { Controller, Control } from 'react-hook-form';
import { Validate } from 'react-hook-form/dist/types/form';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		'& label.Mui-focused': {
			color: theme.palette.common.white,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: theme.palette.common.white,
		},
		'& .MuiSvgIcon-root': {
			color: theme.palette.common.white,
		},
	},
}));

interface Props {
	name: string;
	options: string[];
	control: Control;
	label: String;
	rules: {
		validate: Validate;
	};
}

export const MultipleAutocomplete = ({
	options,
	name,
	control,
	label,
	rules,
}: Props) => {
	const classes = useStyles();

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ onChange }) => (
				<MuiAutocomplete
					multiple
					autoComplete
					options={options}
					classes={classes}
					fullWidth
					size='small'
					renderInput={(params: TextFieldProps) => (
						<TextField
							{...params}
							variant='standard'
							label={label}
							classes={classes}
						/>
					)}
					onChange={(_, value) => {
						onChange(value);
					}}
				/>
			)}
		/>
	);
};
