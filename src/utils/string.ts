export const string = {
  getFirstWord: (str?: string) => {
		if (!str) return '';
		return str.split(' ')[0];
	}
};