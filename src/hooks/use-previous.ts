import { useRef, useEffect } from 'react';
import { Maybe } from '../types/UtilityTypes';

export const usePrevious = <T>(value: T): Maybe<T> => {
	const ref = useRef<T>();

	// this is executed only after the component has rendered
	useEffect(() => {
		ref.current = value;
	});
	
	return ref.current;
};
