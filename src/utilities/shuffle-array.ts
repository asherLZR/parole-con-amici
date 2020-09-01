import { cloneDeep } from 'lodash';

export const getRandomIntInRange = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Durstenfeld shuffle */
export const shuffleArray = <T>(array: T[]): T[] => {
	const copyArray = cloneDeep(array);
	for (let i = copyArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
	}
	return copyArray;
};
