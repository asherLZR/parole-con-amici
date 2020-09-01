export type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

export type Maybe<T> = T | undefined | null;

export interface FixedLengthArray<T extends any, L extends number>
	extends Array<T> {
	0: T;
	length: L;
}

export interface Action {
	type: string;
}

export type ValidateShape<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

export enum Position {
	TOP = 'TOP',
	BOTTOM = 'BOTTOM',
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
}
