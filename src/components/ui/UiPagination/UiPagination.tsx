import { UiPaginationButton } from '@/components/ui/UiPaginationButton';
import { UiPaginationNavButton } from '@/components/ui/UiPaginationNavButton';

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
			<UiPaginationNavButton
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!canGoPrevious || isLoading}
				direction="previous"
			/>

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

			<UiPaginationNavButton
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!canGoNext || isLoading}
				direction="next"
			/>
		</div>
	);
}
