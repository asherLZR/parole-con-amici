import React, { RefObject, HTMLProps } from 'react';
import { IconImage } from '../Avatar';

export type SelectValue = string | string[] | number | undefined;

export interface IconSelectOption<T extends SelectValue> {
	icon: string;
	value: T;
}

interface Props<T extends SelectValue> extends HTMLProps<HTMLLabelElement> {
	name: string;
	option: IconSelectOption<T>;
	register: RefObject<HTMLInputElement>;
}

export const IconRadio = <T extends SelectValue>({
	name,
	option,
	register,
	...props
}: Props<T>) => {
	const { icon, value } = option;

	return (
		<label {...props}>
			<input type='radio' name={name} value={value} ref={register} hidden />
			<IconImage iconSrc={icon} />
		</label>
	);
};
