import { helpers } from '@/utils/helpers';
import { UiPaginationButton } from '@/components/ui/UiPaginationButton';

interface UiPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export default function UiPagination({
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false
}: UiPaginationProps) {
	if (totalPages <= 1) return null;

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

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
				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
					<UiPaginationButton
						key={i}
						index={i}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
						isLoading={isLoading}
					/>
				))}
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
