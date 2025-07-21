import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UiPopover from './UiPopover';

// Mock framer-motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: React.ComponentProps<'div'>) => (
			<div {...props}>{children}</div>
		)
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}));

const defaultProps = {
	isOpen: true,
	onClose: jest.fn(),
	children: <div>Popover content</div>
};

describe('UiPopover', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders when open', () => {
		render(<UiPopover {...defaultProps} />);

		expect(screen.getByText('Popover content')).toBeInTheDocument();
	});

	it('does not render when closed', () => {
		render(<UiPopover {...defaultProps} isOpen={false} />);

		expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
	});

	it('shows backdrop by default', () => {
		render(<UiPopover {...defaultProps} />);

		const backdrop = document.querySelector('.bg-black\\/20');
		expect(backdrop).toBeInTheDocument();
	});

	it('hides backdrop when showBackdrop is false', () => {
		render(<UiPopover {...defaultProps} showBackdrop={false} />);

		const backdrop = document.querySelector('.fixed.inset-0');
		expect(backdrop).not.toBeInTheDocument();
	});

	it('calls onClose when backdrop is clicked', async () => {
		const user = userEvent.setup();
		render(<UiPopover {...defaultProps} />);

		// Find backdrop by its position and background classes
		const backdrop = document.querySelector('.fixed.inset-0');
		if (backdrop) {
			await user.click(backdrop);
		}

		expect(defaultProps.onClose).toHaveBeenCalled();
	});

	it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		render(<UiPopover {...defaultProps} onClose={onClose} closeOnBackdropClick={false} />);

		// Find backdrop by its position and background classes
		const backdrop = document.querySelector('.fixed.inset-0');
		if (backdrop) {
			await user.click(backdrop);
		}

		expect(onClose).not.toHaveBeenCalled();
	});

	it('calls onClose when escape key is pressed', () => {
		render(<UiPopover {...defaultProps} />);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(defaultProps.onClose).toHaveBeenCalled();
	});

	it('does not close on escape when closeOnEscape is false', () => {
		render(<UiPopover {...defaultProps} closeOnEscape={false} />);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(defaultProps.onClose).not.toHaveBeenCalled();
	});

	it('applies position classes correctly', () => {
		const { rerender } = render(<UiPopover {...defaultProps} position="top-left" />);

		let popover = screen.getByText('Popover content').closest('.absolute');
		expect(popover).toHaveClass('bottom-full', 'left-0', 'mb-2');

		rerender(<UiPopover {...defaultProps} position="right-center" />);
		popover = screen.getByText('Popover content').closest('.absolute');
		expect(popover).toHaveClass('left-full', 'top-1/2', '-translate-y-1/2', 'ml-2');
	});

	it('applies custom content classes correctly', () => {
		const { rerender } = render(<UiPopover {...defaultProps} contentClassName="w-64" />);

		let popover = screen.getByText('Popover content').closest('.absolute');
		expect(popover).toHaveClass('w-64');

		rerender(<UiPopover {...defaultProps} contentClassName="w-96" />);
		popover = screen.getByText('Popover content').closest('.absolute');
		expect(popover).toHaveClass('w-96');
	});

	it('applies backdrop blur when enabled', () => {
		render(<UiPopover {...defaultProps} backdropBlur />);

		const backdrop = document.querySelector('.backdrop-blur-sm');
		expect(backdrop).toBeInTheDocument();
	});

	it('forwards ref correctly', () => {
		const ref = { current: null };
		render(<UiPopover {...defaultProps} ref={ref} />);

		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it('applies custom className', () => {
		render(<UiPopover {...defaultProps} className="custom-wrapper" />);

		const wrapper = document.querySelector('.custom-wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	it('applies custom contentClassName', () => {
		render(<UiPopover {...defaultProps} contentClassName="custom-content" />);

		const content = document.querySelector('.custom-content');
		expect(content).toBeInTheDocument();
	});

	it('uses custom zIndex', () => {
		render(<UiPopover {...defaultProps} zIndex={100} />);

		const popover = screen.getByText('Popover content').closest('.absolute');
		expect(popover).toHaveClass('z-100');
	});

	it('renders children correctly', () => {
		const customContent = (
			<div>
				<h1>Title</h1>
				<p>Description</p>
				<button>Action</button>
			</div>
		);

		render(<UiPopover {...defaultProps}>{customContent}</UiPopover>);

		expect(screen.getByText('Title')).toBeInTheDocument();
		expect(screen.getByText('Description')).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();
	});

	describe('Position calculations', () => {
		const positions = [
			'top-left',
			'top-center',
			'top-right',
			'bottom-left',
			'bottom-center',
			'bottom-right',
			'left-top',
			'left-center',
			'left-bottom',
			'right-top',
			'right-center',
			'right-bottom'
		] as const;

		positions.forEach((position) => {
			it(`applies correct classes for position ${position}`, () => {
				render(<UiPopover {...defaultProps} position={position} />);

				const popover = screen.getByText('Popover content').closest('.absolute');
				expect(popover).toHaveClass('absolute');

				// Each position should have specific positioning classes
				expect(popover?.className).toMatch(/(?:top|bottom|left|right)/);
			});
		});
	});
});
