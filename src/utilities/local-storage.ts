enum StorageKey {
	USERNAME = 'username',
}

export const getUsername = () =>
	localStorage.getItem(StorageKey.USERNAME) ?? '';

export const setUsername = (username: string) => {
	localStorage.setItem(StorageKey.USERNAME, username);
};

export const clearStorage = () => {
	localStorage.clear();
};
