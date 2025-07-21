import { renderHook } from '@testing-library/react';
import { usePopover } from '../usePopover';

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(document, 'addEventListener', {
	value: mockAddEventListener,
	writable: true
});

Object.defineProperty(document, 'removeEventListener', {
	value: mockRemoveEventListener,
	writable: true
});

describe('usePopover', () => {
	const mockOnClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns a popover ref', () => {
		const { result } = renderHook(() => usePopover({ isOpen: false, onClose: mockOnClose }));

		expect(result.current.popoverRef).toBeDefined();
		expect(result.current.popoverRef.current).toBeNull();
	});

	it('adds event listeners when popover is open', () => {
		renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose }));

		expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
		expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
	});

	it('does not add event listeners when popover is closed', () => {
		renderHook(() => usePopover({ isOpen: false, onClose: mockOnClose }));

		expect(mockAddEventListener).not.toHaveBeenCalled();
	});

	it('removes event listeners on cleanup', () => {
		const { unmount } = renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose }));

		unmount();

		expect(mockRemoveEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
		expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
	});

	it('updates event listeners when isOpen changes', () => {
		const { rerender } = renderHook(
			({ isOpen }) => usePopover({ isOpen, onClose: mockOnClose }),
			{ initialProps: { isOpen: false } }
		);

		expect(mockAddEventListener).not.toHaveBeenCalled();

		rerender({ isOpen: true });
		expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
		expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

		rerender({ isOpen: false });
		expect(mockRemoveEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
		expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
	});

	describe('Click outside behavior', () => {
		let mockPopoverElement: HTMLElement;
		let mockTriggerElement: HTMLElement;

		beforeEach(() => {
			mockPopoverElement = document.createElement('div') as HTMLDivElement;
			mockTriggerElement = document.createElement('button');

			mockPopoverElement.contains = jest.fn();
			mockTriggerElement.contains = jest.fn();
		});

		it('calls onClose when clicking outside popover and trigger', () => {
			const triggerRef = { current: mockTriggerElement };

			renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose, triggerRef }));

			const mouseDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'mousedown'
			)?.[1];

			(mockPopoverElement.contains as jest.Mock).mockReturnValue(false);
			(mockTriggerElement.contains as jest.Mock).mockReturnValue(false);

			const mockEvent = {
				target: document.createElement('div')
			} as unknown as MouseEvent;

			mouseDownHandler?.(mockEvent);

			expect(mockOnClose).toHaveBeenCalled();
		});

		it('does not call onClose when clicking inside popover', () => {
			const triggerRef = { current: mockTriggerElement };

			const { result } = renderHook(() =>
				usePopover({ isOpen: true, onClose: mockOnClose, triggerRef })
			);

			result.current.popoverRef.current = mockPopoverElement as HTMLDivElement;

			const mouseDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'mousedown'
			)?.[1];

			(mockPopoverElement.contains as jest.Mock).mockReturnValue(true);

			const mockEvent = {
				target: document.createElement('div')
			} as unknown as MouseEvent;

			mouseDownHandler?.(mockEvent);

			expect(mockOnClose).not.toHaveBeenCalled();
		});

		it('does not call onClose when clicking trigger', () => {
			const triggerRef = { current: mockTriggerElement };

			renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose, triggerRef }));

			const mouseDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'mousedown'
			)?.[1];

			(mockPopoverElement.contains as jest.Mock).mockReturnValue(false);
			(mockTriggerElement.contains as jest.Mock).mockReturnValue(true);

			const mockEvent = {
				target: document.createElement('div')
			} as unknown as MouseEvent;

			mouseDownHandler?.(mockEvent);

			expect(mockOnClose).not.toHaveBeenCalled();
		});

		it('handles missing triggerRef gracefully', () => {
			renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose }));

			const mouseDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'mousedown'
			)?.[1];

			const mockEvent = {
				target: document.createElement('div')
			} as unknown as MouseEvent;

			expect(() => mouseDownHandler?.(mockEvent)).not.toThrow();
		});
	});

	describe('Escape key behavior', () => {
		it('calls onClose when Escape key is pressed and popover is open', () => {
			renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose }));

			const keyDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'keydown'
			)?.[1];

			const mockEvent = {
				key: 'Escape'
			} as KeyboardEvent;

			keyDownHandler?.(mockEvent);

			expect(mockOnClose).toHaveBeenCalled();
		});

		it('does not call onClose for other keys', () => {
			renderHook(() => usePopover({ isOpen: true, onClose: mockOnClose }));

			const keyDownHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'keydown'
			)?.[1];

			const mockEvent = {
				key: 'Enter'
			} as KeyboardEvent;

			keyDownHandler?.(mockEvent);

			expect(mockOnClose).not.toHaveBeenCalled();
		});

		it('does not call onClose when popover is closed', () => {
			renderHook(() => usePopover({ isOpen: false, onClose: mockOnClose }));

			expect(mockAddEventListener).not.toHaveBeenCalled();
		});
	});
});
