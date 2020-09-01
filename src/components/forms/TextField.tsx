import React from 'react';
import {
	TextField as MuiTextField,
	WithStyles,
	StyleRules,
	StandardTextFieldProps,
} from '@material-ui/core';
import { Controller, Control } from 'react-hook-form';

interface Props extends StandardTextFieldProps {
	name: string;
	control: Control;
	rules: { required: boolean; pattern?: RegExp };
}

export const TextField = ({
	name,
	control,
	rules,
	classes,
	...rest
}: WithStyles<StyleRules> & Props) => {
	return (
		<Controller
			name={name}
			control={control}
			classes={classes}
			defaultValue={''}
			as={<MuiTextField {...rest} variant='outlined' />}
			rules={rules}
		/>
	);
};
