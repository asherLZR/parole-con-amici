import { useRef, useState, useEffect, RefObject } from 'react';
import { Maybe } from '../types/UtilityTypes';

export type BoundingRectType = [Maybe<DOMRect>, RefObject<HTMLDivElement>];

const defaultDomRect: DOMRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
	toJSON: () => defaultDomRect,
};

export const useBoundingRect = (): BoundingRectType => {
	const ref = useRef<HTMLDivElement>(null);
	const [boundingRect, setBoundingRect] = useState<DOMRect>();

	const set = () =>
		setBoundingRect(ref.current?.getBoundingClientRect() ?? defaultDomRect);

	useEffect(() => {
		set();
		window.addEventListener('resize', set);
		return () => window.removeEventListener('resize', set);
	}, []);

	return [boundingRect, ref];
};
