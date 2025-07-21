import { useEffect, useRef, useCallback } from 'react';

export interface UsePopoverProps {
	isOpen: boolean;
	onClose: () => void;
	triggerRef?: React.RefObject<HTMLElement | null>;
}

export interface UsePopoverReturn {
	popoverRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * The usePopover function in TypeScript manages the visibility of a popover based on user
 * interactions.
 * @param {UsePopoverProps}  - The `usePopover` function is a custom hook that manages the behavior of
 * a popover component. It takes in three parameters:
 * @returns The `usePopover` function returns an object with a `popoverRef` property, which is a
 * reference to a `div` element used for the popover.
 */
export function usePopover({ isOpen, onClose, triggerRef }: UsePopoverProps): UsePopoverReturn {
	const popoverRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!isOpen) return;

			const target = event.target as Node;
			const isClickInsidePopover = popoverRef.current?.contains(target);
			const isClickInsideTrigger = triggerRef?.current?.contains(target);

			if (!isClickInsidePopover && !isClickInsideTrigger) {
				onClose();
			}
		},
		[isOpen, onClose, triggerRef]
	);

	const handleEscapeKey = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		},
		[isOpen, onClose]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscapeKey);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen, handleClickOutside, handleEscapeKey]);

	return {
		popoverRef
	};
}
