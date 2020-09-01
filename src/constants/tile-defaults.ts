import { Tiles } from '../types/TileTypes';
export enum StarType {
	Central = 'C',
	DoubleWord = 'DW',
	DoubleLetter = 'DL',
	TripleWord = 'TW',
	TripleLetter = 'TL',
}

export const WordMultipliers: Record<string, number> = {
	[StarType.DoubleWord]: 2,
	[StarType.TripleWord]: 3,
};

export const LetterMultipliers: Record<string, number> = {
	[StarType.DoubleLetter]: 2,
	[StarType.TripleLetter]: 3,
};

export const StarLocations: Map<number, StarType> = new Map([
	[112, StarType.Central],
	[16, StarType.DoubleWord],
	[32, StarType.DoubleWord],
	[48, StarType.DoubleWord],
	[64, StarType.DoubleWord],
	[28, StarType.DoubleWord],
	[42, StarType.DoubleWord],
	[56, StarType.DoubleWord],
	[70, StarType.DoubleWord],
	[196, StarType.DoubleWord],
	[182, StarType.DoubleWord],
	[168, StarType.DoubleWord],
	[154, StarType.DoubleWord],
	[208, StarType.DoubleWord],
	[192, StarType.DoubleWord],
	[176, StarType.DoubleWord],
	[160, StarType.DoubleWord],
	[96, StarType.DoubleLetter],
	[98, StarType.DoubleLetter],
	[126, StarType.DoubleLetter],
	[128, StarType.DoubleLetter],
	[92, StarType.DoubleLetter],
	[98, StarType.DoubleLetter],
	[122, StarType.DoubleLetter],
	[102, StarType.DoubleLetter],
	[116, StarType.DoubleLetter],
	[132, StarType.DoubleLetter],
	[45, StarType.DoubleLetter],
	[59, StarType.DoubleLetter],
	[3, StarType.DoubleLetter],
	[11, StarType.DoubleLetter],
	[108, StarType.DoubleLetter],
	[52, StarType.DoubleLetter],
	[38, StarType.DoubleLetter],
	[36, StarType.DoubleLetter],
	[165, StarType.DoubleLetter],
	[179, StarType.DoubleLetter],
	[213, StarType.DoubleLetter],
	[221, StarType.DoubleLetter],
	[172, StarType.DoubleLetter],
	[186, StarType.DoubleLetter],
	[188, StarType.DoubleLetter],
	[0, StarType.TripleWord],
	[14, StarType.TripleWord],
	[7, StarType.TripleWord],
	[217, StarType.TripleWord],
	[119, StarType.TripleWord],
	[210, StarType.TripleWord],
	[105, StarType.TripleWord],
	[224, StarType.TripleWord],
	[20, StarType.TripleLetter],
	[24, StarType.TripleLetter],
	[80, StarType.TripleLetter],
	[84, StarType.TripleLetter],
	[76, StarType.TripleLetter],
	[88, StarType.TripleLetter],
	[200, StarType.TripleLetter],
	[204, StarType.TripleLetter],
	[140, StarType.TripleLetter],
	[144, StarType.TripleLetter],
	[136, StarType.TripleLetter],
	[148, StarType.TripleLetter],
]);

const ITALIAN_TILES_DEFAULT_COUNT = 120;

const ITALIAN_TILES_DEFAULT: Tiles = {
	a: { count: 14, points: 1 },
	b: { count: 3, points: 5 },
	c: { count: 6, points: 2 },
	d: { count: 3, points: 5 },
	e: { count: 11, points: 1 },
	f: { count: 3, points: 5 },
	g: { count: 2, points: 8 },
	h: { count: 2, points: 8 },
	i: { count: 12, points: 1 },
	l: { count: 5, points: 3 },
	m: { count: 5, points: 3 },
	n: { count: 5, points: 3 },
	o: { count: 15, points: 1 },
	p: { count: 3, points: 5 },
	q: { count: 1, points: 10 },
	r: { count: 6, points: 2 },
	s: { count: 6, points: 2 },
	t: { count: 6, points: 2 },
	u: { count: 5, points: 3 },
	v: { count: 3, points: 5 },
	z: { count: 2, points: 8 },
	blank: { count: 2, points: 0 },
};

export const ENGLISH_TILES_DEFAULT_COUNT = 100;

export const ENGLISH_TILES_DEFAULT: Tiles = {
	a: { count: 9, points: 1 },
	b: { count: 2, points: 3 },
	c: { count: 2, points: 3 },
	d: { count: 4, points: 2 },
	e: { count: 12, points: 1 },
	f: { count: 2, points: 4 },
	g: { count: 3, points: 2 },
	h: { count: 2, points: 4 },
	i: { count: 9, points: 1 },
	j: { count: 1, points: 8 },
	k: { count: 1, points: 5 },
	l: { count: 4, points: 1 },
	m: { count: 2, points: 3 },
	n: { count: 6, points: 1 },
	o: { count: 8, points: 1 },
	p: { count: 2, points: 3 },
	q: { count: 1, points: 10 },
	r: { count: 6, points: 1 },
	s: { count: 4, points: 1 },
	t: { count: 6, points: 1 },
	u: { count: 4, points: 1 },
	v: { count: 2, points: 4 },
	w: { count: 2, points: 4 },
	x: { count: 1, points: 8 },
	y: { count: 2, points: 4 },
	z: { count: 1, points: 10 },
	blank: { count: 2, points: 0 },
};

export enum Language {
	ENGLISH = 'English',
	ITALIAN = 'Italiano',
}

export const TileSet: Record<
	Language,
	{
		tileset: Tiles;
		count: number;
	}
> = {
	[Language.ENGLISH]: {
		tileset: ENGLISH_TILES_DEFAULT,
		count: ENGLISH_TILES_DEFAULT_COUNT,
	},
	[Language.ITALIAN]: {
		tileset: ITALIAN_TILES_DEFAULT,
		count: ITALIAN_TILES_DEFAULT_COUNT,
	},
};
