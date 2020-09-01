import React from 'react';
import { makeStyles, Theme, MenuItem } from '@material-ui/core';
import MuiSelect from '@material-ui/core/Select';
import { Control, Controller } from 'react-hook-form';

const useStyles = makeStyles<Theme>((theme: Theme) => ({}));

interface Props {
	name: string;
	label: string;
	control: Control;
	defaultValue: string;
	options: string[];
	rules: { required: boolean };
}

export const Select = ({
	name,
	control,
	label,
	defaultValue,
	options,
	rules,
}: Props) => {
	const classes = useStyles();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			as={
				<MuiSelect label={label}>
					{/* note: uses index as key so assumes indexes are stable */}
					{options.map((option, i) => (
						<MenuItem key={i} value={option} className={classes.menuItem}>
							{option}
						</MenuItem>
					))}
				</MuiSelect>
			}
			rules={rules}
		/>
	);
};
