import { helpers } from '@/utils/helpers';

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
	const pageNumber = helpers.pagination.getPageNumber(index, currentPage, totalPages);
	const isActive = pageNumber === currentPage;

	return (
		<button
			key={pageNumber}
			onClick={() => onPageChange(pageNumber)}
			disabled={isLoading}
			className={helpers.cn(
				'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all active:scale-95',
				isActive
					? 'bg-card-active text-neutral-800 shadow-lg'
					: 'bg-card hover:bg-card-hover text-neutral-800 active:scale-95',
				isLoading && 'cursor-not-allowed opacity-50'
			)}
		>
			{pageNumber}
		</button>
	);
}
