import React from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { SelectValue, IconRadio, IconSelectOption } from './IconRadio';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		width: 'fit-content',
		'& label': {
			'& img': {
				cursor: 'pointer',
				borderColor: 'transparent',
				borderStyle: 'solid',
				borderRadius: '50%',
				transition: '600ms',
			},
			'& :checked + img': {
				borderColor: theme.palette.common.white,
				borderStyle: 'solid',
				borderRadius: '50%',
			},
		},
	},
}));

interface Props<T extends SelectValue> {
	name: string;
	register: any;
	options: IconSelectOption<T>[];
}

export const IconRadioGroup = React.memo(
	<T extends SelectValue>({ name, register, options }: Props<T>) => {
		const classes = useStyles();

		return (
			<Grid container className={classes.root} spacing={1}>
				{options.map((option: IconSelectOption<T>, i) => {
					return (
						<Grid item key={i}>
							<IconRadio name={name} option={option} register={register} />
						</Grid>
					);
				})}
			</Grid>
		);
	}
);
