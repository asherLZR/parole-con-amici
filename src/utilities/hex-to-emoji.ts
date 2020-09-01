import { Maybe } from '../types/UtilityTypes';

// used to separate emoji unicode from skin tone unicode
const EMOJI_DELIMITER = '-';

export const DEFAULT_SMILEY = '1f600';

const toEmojiHelper = (hex: string) => {
	return String.fromCodePoint(parseInt(hex, 16));
};

export const hexToEmoji = (hex: Maybe<string>) => {
	if (!hex) {
		hex = DEFAULT_SMILEY;
	}

	const hexes = hex.split(EMOJI_DELIMITER);
	const emoji = toEmojiHelper(hexes[0]);
	const skinTone = hexes[1] ? toEmojiHelper(hexes[1]) : '';
	return emoji + skinTone;
};
