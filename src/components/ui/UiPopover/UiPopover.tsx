import { forwardRef, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopover } from '@/hooks/usePopover';
import { helpers } from '@/utils/helpers';

export type PopoverPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'right-top'
	| 'right-center'
	| 'right-bottom';

export interface UiPopoverProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	triggerRef?: React.RefObject<HTMLElement | null>;
	position?: PopoverPosition;
	showBackdrop?: boolean;
	backdropBlur?: boolean;
	className?: string;
	contentClassName?: string;
	closeOnBackdropClick?: boolean;
	closeOnEscape?: boolean;
	zIndex?: number;
}

const POSITION_CLASSES: Record<PopoverPosition, string> = {
	'top-left': 'bottom-full left-0 mb-2',
	'top-center': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
	'top-right': 'bottom-full right-0 mb-2',
	'bottom-left': 'top-full left-0',
	'bottom-center': 'top-full left-1/2 -translate-x-1/2',
	'bottom-right': 'top-full right-0',
	'left-top': 'right-full top-0 mr-2',
	'left-center': 'right-full top-1/2 -translate-y-1/2 mr-2',
	'left-bottom': 'right-full bottom-0 mr-2',
	'right-top': 'left-full top-0 ml-2',
	'right-center': 'left-full top-1/2 -translate-y-1/2 ml-2',
	'right-bottom': 'left-full bottom-0 ml-2'
};

// Animation configurations removed - using inline animations for simplicity

const UiPopover = forwardRef<HTMLDivElement, UiPopoverProps>(
	(
		{
			isOpen,
			onClose,
			children,
			triggerRef,
			position = 'bottom-right',
			showBackdrop = true,
			backdropBlur = false,
			className,
			contentClassName,
			closeOnBackdropClick = true,
			closeOnEscape = true,
			zIndex = 50
		},
		ref
	) => {
		// Only pass onClose to usePopover if both backdrop click and escape are enabled
		// because usePopover handles both behaviors together
		const { popoverRef } = usePopover({
			isOpen,
			onClose: closeOnBackdropClick && closeOnEscape ? onClose : () => {},
			triggerRef
		});

		const handleBackdropClick = () => {
			if (closeOnBackdropClick) {
				onClose();
			}
		};

		// Handle escape key and click outside separately when usePopover can't handle them
		useEffect(() => {
			const handleEscapeKey = (event: KeyboardEvent) => {
				if (event.key === 'Escape' && isOpen && closeOnEscape) {
					onClose();
				}
			};

			const handleClickOutside = (event: MouseEvent) => {
				if (!isOpen || !closeOnBackdropClick) return;

				const target = event.target as Node;
				const isClickInsidePopover = popoverRef.current?.contains(target);
				const isClickInsideTrigger = triggerRef?.current?.contains(target);

				if (!isClickInsidePopover && !isClickInsideTrigger) {
					onClose();
				}
			};

			// Only add manual listeners when usePopover isn't handling them
			if (isOpen && (!closeOnBackdropClick || !closeOnEscape)) {
				if (closeOnEscape) {
					document.addEventListener('keydown', handleEscapeKey);
				}
				if (closeOnBackdropClick) {
					document.addEventListener('mousedown', handleClickOutside);
				}
			}

			return () => {
				document.removeEventListener('keydown', handleEscapeKey);
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen, closeOnEscape, closeOnBackdropClick, onClose, triggerRef, popoverRef]);

		const backdropClasses = helpers.cn(
			'fixed inset-0',
			`z-${zIndex - 10}`,
			showBackdrop && 'bg-black/20',
			backdropBlur && 'backdrop-blur-sm'
		);

		const popoverClasses = helpers.cn(
			'absolute rounded-lg border border-neutral-700 bg-neutral-900 shadow-2xl',
			`z-${zIndex}`,
			POSITION_CLASSES[position],
			contentClassName
		);

		const wrapperClasses = helpers.cn('relative', className);

		if (!isOpen) return null;

		return (
			<AnimatePresence>
				{isOpen && (
					<div className={wrapperClasses} ref={ref}>
						{/* Backdrop */}
						{showBackdrop && (
							<motion.div
								className={backdropClasses}
								onClick={handleBackdropClick}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							/>
						)}

						{/* Popover Content */}
						<motion.div
							ref={popoverRef}
							className={popoverClasses}
							initial={{ opacity: 0, y: -8, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.96 }}
							transition={{
								type: 'spring',
								damping: 20,
								stiffness: 300,
								duration: 0.2
							}}
						>
							{children}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		);
	}
);

UiPopover.displayName = 'UiPopover';

export default UiPopover;
