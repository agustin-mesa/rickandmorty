export const pagination = {
	getPageNumber: (index: number, currentPage: number, totalPages: number): number => {
		if (totalPages <= 5) return index + 1;
		if (currentPage <= 3) return index + 1;
		if (currentPage >= totalPages - 2) return totalPages - 4 + index;
		return currentPage - 2 + index;
	}
};
