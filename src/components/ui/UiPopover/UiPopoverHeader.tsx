import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { helpers } from '@/utils/helpers';

export interface UiPopoverHeaderProps {
	title: string;
	onClose: () => void;
	children?: ReactNode;
	isLoading?: boolean;
	className?: string;
}

const UiPopoverHeader = memo<UiPopoverHeaderProps>(
	({ title, onClose, children, isLoading = false, className = '' }) => (
		<div className={helpers.cn('mb-4 flex items-center justify-between', className)}>
			<h3 className="text-lg font-semibold text-neutral-200">{title}</h3>
			<div className="flex items-center gap-2">
				{children}
				<motion.button
					onClick={onClose}
					disabled={isLoading}
					className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					aria-label="Close"
				>
					<CloseIcon />
				</motion.button>
			</div>
		</div>
	)
);

const CloseIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		aria-hidden="true"
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

UiPopoverHeader.displayName = 'UiPopoverHeader';

export default UiPopoverHeader;
