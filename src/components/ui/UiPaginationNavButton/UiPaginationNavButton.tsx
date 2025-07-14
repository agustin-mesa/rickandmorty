import { motion } from 'framer-motion';
import { helpers } from '@/utils/helpers';
import { navButtonHoverVariants, navButtonDirectionVariants } from './animations';

interface UiPaginationNavButtonProps {
	onClick: () => void;
	disabled: boolean;
	direction: 'previous' | 'next';
}

export default function UiPaginationNavButton({
	onClick,
	disabled,
	direction
}: UiPaginationNavButtonProps) {
	const symbol = direction === 'previous' ? '‹' : '›';

	return (
		<motion.button
			onClick={onClick}
			disabled={disabled}
			className={helpers.cn(
				'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
				!disabled
					? 'bg-card hover:bg-card-hover text-neutral-800 active:scale-95'
					: 'cursor-not-allowed bg-neutral-500 text-neutral-400'
			)}
			variants={navButtonHoverVariants}
			initial="initial"
			whileHover={!disabled ? 'hover' : {}}
			whileTap={!disabled ? 'tap' : {}}
		>
			<motion.span
				variants={navButtonDirectionVariants}
				initial="initial"
				animate={!disabled ? 'initial' : 'initial'}
				whileHover={
					!disabled ? (direction === 'previous' ? 'hoverPrevious' : 'hoverNext') : {}
				}
			>
				{symbol}
			</motion.span>
		</motion.button>
	);
}
