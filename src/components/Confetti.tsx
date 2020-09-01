import React, { useEffect, useRef } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useSelector, useDispatch } from 'react-redux';
import { getConfettiState, endConfetti } from '../store/confetti';

export default () => {
	const { width, height } = useWindowSize();
	const confettiOn = useSelector(getConfettiState);
	const dispatch = useDispatch();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// clears a timeout if it exists, otherwise if the confetti is on, set a new timeout
	useEffect(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		} else {
			if (confettiOn) {
				timeoutRef.current = setTimeout(() => {
					timeoutRef.current = null;
					dispatch(endConfetti());
				}, 3000);
			}
		}
	}, [dispatch, confettiOn]);

	return (
		<Confetti
			numberOfPieces={confettiOn ? 200 : 0}
			width={width}
			height={height}
			style={{ position: 'fixed' }}
		/>
	);
};
