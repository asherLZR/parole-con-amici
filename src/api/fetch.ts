export type Fetch = (
	input: RequestInfo,
	init?: RequestInit
) => Promise<Response>;

const handleErrors = (res: Response) => {
	if (!res.ok) {
		throw Error(res.statusText);
	}
	return res;
};

export const SERVER_URL =
	process.env.REACT_APP_PCA_SERVER || 'http://localhost:5000';

export const fetchApi: Fetch = (input, init) => {
	return fetch(
		process.env.NODE_ENV === 'development' ? input : `${SERVER_URL}${input}`,
		init
	).then(handleErrors);
};
