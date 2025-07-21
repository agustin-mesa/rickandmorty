import { memo } from 'react';
import { motion } from 'framer-motion';

export interface UiPopoverClearButtonProps {
	onClick: () => void;
	isVisible: boolean;
	isLoading?: boolean;
	text?: string;
	className?: string;
}

const UiPopoverClearButton = memo<UiPopoverClearButtonProps>(
	({ onClick, isVisible, isLoading = false, text = 'Clear all', className = '' }) => {
		if (!isVisible) return null;

		return (
			<motion.button
				onClick={onClick}
				disabled={isLoading}
				className={`text-sm text-neutral-400 transition-colors hover:text-neutral-200 disabled:opacity-50 ${className}`}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{text}
			</motion.button>
		);
	}
);

UiPopoverClearButton.displayName = 'UiPopoverClearButton';

export default UiPopoverClearButton;
