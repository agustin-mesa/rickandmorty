import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface UiPopoverFooterProps {
	onCancel: () => void;
	onConfirm: () => void;
	cancelText?: string;
	confirmText?: string;
	isLoading?: boolean;
	className?: string;
	children?: ReactNode;
}

const UiPopoverFooter = memo<UiPopoverFooterProps>(
	({
		onCancel,
		onConfirm,
		cancelText = 'Cancel',
		confirmText = 'Confirm',
		isLoading = false,
		className = '',
		children
	}) => (
		<div className={`mt-6 flex gap-3 ${className}`}>
			{children || (
				<>
					<motion.button
						onClick={onCancel}
						disabled={isLoading}
						className="flex-1 rounded-md border border-neutral-600 bg-transparent px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{cancelText}
					</motion.button>
					<motion.button
						onClick={onConfirm}
						disabled={isLoading}
						className="bg-primary disabled:bg-primary/50 hover:bg-primary/80 flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{isLoading ? (
							<>
								<LoadingSpinner />
								Loading...
							</>
						) : (
							confirmText
						)}
					</motion.button>
				</>
			)}
		</div>
	)
);

const LoadingSpinner = () => (
	<div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
);

UiPopoverFooter.displayName = 'UiPopoverFooter';

export default UiPopoverFooter;
