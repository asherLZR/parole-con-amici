export const swap = (list: any[], i: number, j: number) => {
	[list[i], list[j]] = [list[j], list[i]];
	return list;
};
