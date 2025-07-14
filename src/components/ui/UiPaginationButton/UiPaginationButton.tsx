import { helpers } from '@/utils/helpers';
import { useCallback } from 'react';

interface UiPaginationButtonProps {
	index: number;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export default function UiPaginationButton({
	index,
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false
}: UiPaginationButtonProps) {
	const getPageNumber = useCallback(
		(index: number): number => {
			if (totalPages <= 5) return index + 1;
			if (currentPage <= 3) return index + 1;
			if (currentPage >= totalPages - 2) return totalPages - 4 + index;
			return currentPage - 2 + index;
		},
		[currentPage, totalPages]
	);

	const pageNumber = getPageNumber(index);
	const isActive = pageNumber === currentPage;

	return (
		<button
			key={pageNumber}
			onClick={() => onPageChange(pageNumber)}
			disabled={isLoading}
			className={helpers.cn(
				'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
				isActive
					? 'bg-[#CAB580] text-neutral-800 shadow-lg'
					: 'bg-[#FFEFD8] text-neutral-800 hover:bg-[#FFE0B4] active:scale-95',
				isLoading && 'cursor-not-allowed opacity-50'
			)}
		>
			{pageNumber}
		</button>
	);
}
