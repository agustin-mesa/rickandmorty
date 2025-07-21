import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UiInput from './UiInput';

describe('UiInput', () => {
	it('renders with basic props', () => {
		render(<UiInput placeholder="Enter text" />);

		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<UiInput label="Username" />);

		expect(screen.getByLabelText('Username')).toBeInTheDocument();
	});

	it('generates unique id when not provided', () => {
		render(<UiInput label="Test" />);

		const input = screen.getByLabelText('Test');
		expect(input).toHaveAttribute('id');
		expect(input.id).toMatch(/^input-/);
	});

	it('uses provided id', () => {
		render(<UiInput label="Test" id="custom-id" />);

		const input = screen.getByLabelText('Test');
		expect(input).toHaveAttribute('id', 'custom-id');
	});

	it('displays error message', () => {
		render(<UiInput label="Email" error="Invalid email" />);

		expect(screen.getByText('Invalid email')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('displays helper text when no error', () => {
		render(<UiInput label="Password" helperText="Must be 8+ characters" />);

		expect(screen.getByText('Must be 8+ characters')).toBeInTheDocument();
	});

	it('prioritizes error over helper text', () => {
		render(<UiInput label="Test" error="Error message" helperText="Helper text" />);

		expect(screen.getByText('Error message')).toBeInTheDocument();
		expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
	});

	it('applies variant classes correctly', () => {
		const { rerender } = render(<UiInput variant="default" />);
		let input = screen.getByRole('textbox');
		expect(input).toHaveClass('border-neutral-700');

		rerender(<UiInput variant="ghost" />);
		input = screen.getByRole('textbox');
		expect(input).toHaveClass('border-transparent');
	});

	it('applies size classes correctly', () => {
		const { rerender } = render(<UiInput inputSize="sm" />);
		let input = screen.getByRole('textbox');
		expect(input).toHaveClass('px-2', 'py-1', 'text-xs');

		rerender(<UiInput inputSize="md" />);
		input = screen.getByRole('textbox');
		expect(input).toHaveClass('px-3', 'py-2', 'text-sm');

		rerender(<UiInput inputSize="lg" />);
		input = screen.getByRole('textbox');
		expect(input).toHaveClass('px-4', 'py-3', 'text-base');
	});

	it('handles disabled state', () => {
		render(<UiInput label="Disabled" disabled />);

		const input = screen.getByLabelText('Disabled');
		const label = screen.getByText('Disabled');

		expect(input).toBeDisabled();
		expect(input).toHaveClass('opacity-50');
		expect(label).toHaveClass('opacity-50');
	});

	it('forwards ref correctly', () => {
		const ref = { current: null };
		render(<UiInput ref={ref} />);

		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});

	it('calls onChange when user types', async () => {
		const user = userEvent.setup();
		const handleChange = jest.fn();

		render(<UiInput onChange={handleChange} />);

		const input = screen.getByRole('textbox');
		await user.type(input, 'test');

		expect(handleChange).toHaveBeenCalled();
	});

	it('has proper accessibility attributes', () => {
		render(<UiInput label="Test" error="Error message" id="test-input" />);

		const input = screen.getByLabelText('Test');

		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
	});

	it('merges custom className', () => {
		render(<UiInput className="custom-class" />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveClass('custom-class');
		expect(input).toHaveClass('w-full'); // Also has base classes
	});
});
