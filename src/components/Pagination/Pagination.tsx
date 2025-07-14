import { helpers } from '@/utils/helpers';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	const getPageNumber = (index: number): number => {
		if (totalPages <= 5) return index + 1;
		if (currentPage <= 3) return index + 1;
		if (currentPage >= totalPages - 2) return totalPages - 4 + index;
		return currentPage - 2 + index;
	};

	const renderPageButton = (index: number) => {
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
	};

	return (
		<div className="flex items-center justify-center gap-2 p-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!canGoPrevious || isLoading}
				className={helpers.cn(
					'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
					canGoPrevious && !isLoading
						? 'bg-[#FFEFD8] text-neutral-800 hover:bg-[#FFE0B4] active:scale-95'
						: 'cursor-not-allowed bg-neutral-500 text-neutral-400'
				)}
			>
				‹
			</button>

			<div className="flex items-center gap-1">
				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => renderPageButton(i))}
			</div>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!canGoNext || isLoading}
				className={helpers.cn(
					'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
					canGoNext && !isLoading
						? 'bg-[#FFEFD8] text-neutral-800 hover:bg-[#FFE0B4] active:scale-95'
						: 'cursor-not-allowed bg-neutral-500 text-neutral-400'
				)}
			>
				›
			</button>
		</div>
	);
}
