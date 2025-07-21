'use client';

import { motion } from 'framer-motion';
import { UiPaginationButton } from '@/components/ui/UiPaginationButton';
import { UiPaginationNavButton } from '@/components/ui/UiPaginationNavButton';
import { UI_PAGINATION_ANIMATIONS } from './animations';

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
		<motion.div
			className="flex items-center justify-center gap-2 p-2"
			variants={UI_PAGINATION_ANIMATIONS.paginationVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={UI_PAGINATION_ANIMATIONS.paginationButtonVariants}>
				<UiPaginationNavButton
					onClick={() => onPageChange(currentPage - 1)}
					disabled={!canGoPrevious || isLoading}
					direction="previous"
				/>
			</motion.div>

			<motion.div
				className="flex items-center gap-1"
				variants={UI_PAGINATION_ANIMATIONS.paginationVariants}
			>
				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
					<motion.div
						key={i}
						variants={UI_PAGINATION_ANIMATIONS.paginationButtonVariants}
					>
						<UiPaginationButton
							index={i}
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={onPageChange}
							isLoading={isLoading}
						/>
					</motion.div>
				))}
			</motion.div>

			<motion.div variants={UI_PAGINATION_ANIMATIONS.paginationButtonVariants}>
				<UiPaginationNavButton
					onClick={() => onPageChange(currentPage + 1)}
					disabled={!canGoNext || isLoading}
					direction="next"
				/>
			</motion.div>
		</motion.div>
	);
}
