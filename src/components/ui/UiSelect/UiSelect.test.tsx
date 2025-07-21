import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UiSelect from './UiSelect';

const mockOptions = [
	{ value: '', label: 'All options' },
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3', disabled: true }
];

describe('UiSelect', () => {
	it('renders with basic props', () => {
		render(<UiSelect options={mockOptions} />);

		const select = screen.getByRole('combobox');
		expect(select).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<UiSelect label="Choose option" options={mockOptions} />);

		expect(screen.getByLabelText('Choose option')).toBeInTheDocument();
	});

	it('renders all options', () => {
		render(<UiSelect options={mockOptions} />);

		expect(screen.getByText('All options')).toBeInTheDocument();
		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(screen.getByText('Option 3')).toBeInTheDocument();
	});

	it('renders placeholder option when provided', () => {
		render(<UiSelect options={mockOptions} placeholder="Select an option" />);

		expect(screen.getByText('Select an option')).toBeInTheDocument();
	});

	it('handles disabled options', () => {
		render(<UiSelect options={mockOptions} />);

		const option3 = screen.getByText('Option 3') as HTMLOptionElement;
		expect(option3.disabled).toBe(true);
	});

	it('generates unique id when not provided', () => {
		render(<UiSelect label="Test" options={mockOptions} />);

		const select = screen.getByLabelText('Test');
		expect(select).toHaveAttribute('id');
		expect(select.id).toMatch(/^select-/);
	});

	it('uses provided id', () => {
		render(<UiSelect label="Test" options={mockOptions} id="custom-id" />);

		const select = screen.getByLabelText('Test');
		expect(select).toHaveAttribute('id', 'custom-id');
	});

	it('displays error message', () => {
		render(<UiSelect label="Status" options={mockOptions} error="Please select a status" />);

		expect(screen.getByText('Please select a status')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('displays helper text when no error', () => {
		render(
			<UiSelect
				label="Status"
				options={mockOptions}
				helperText="Choose your preferred status"
			/>
		);

		expect(screen.getByText('Choose your preferred status')).toBeInTheDocument();
	});

	it('prioritizes error over helper text', () => {
		render(
			<UiSelect
				label="Test"
				options={mockOptions}
				error="Error message"
				helperText="Helper text"
			/>
		);

		expect(screen.getByText('Error message')).toBeInTheDocument();
		expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
	});

	it('applies variant classes correctly', () => {
		const { rerender } = render(<UiSelect variant="default" options={mockOptions} />);
		let select = screen.getByRole('combobox');
		expect(select).toHaveClass('border-neutral-700');

		rerender(<UiSelect variant="ghost" options={mockOptions} />);
		select = screen.getByRole('combobox');
		expect(select).toHaveClass('border-transparent');
	});

	it('applies size classes correctly', () => {
		const { rerender } = render(<UiSelect selectSize="sm" options={mockOptions} />);
		let select = screen.getByRole('combobox');
		expect(select).toHaveClass('px-2', 'py-1', 'text-xs');

		rerender(<UiSelect selectSize="md" options={mockOptions} />);
		select = screen.getByRole('combobox');
		expect(select).toHaveClass('px-3', 'py-2', 'text-sm');

		rerender(<UiSelect selectSize="lg" options={mockOptions} />);
		select = screen.getByRole('combobox');
		expect(select).toHaveClass('px-4', 'py-3', 'text-base');
	});

	it('handles disabled state', () => {
		render(<UiSelect label="Disabled" options={mockOptions} disabled />);

		const select = screen.getByLabelText('Disabled');
		const label = screen.getByText('Disabled');

		expect(select).toBeDisabled();
		expect(select).toHaveClass('opacity-50');
		expect(label).toHaveClass('opacity-50');
	});

	it('forwards ref correctly', () => {
		const ref = { current: null };
		render(<UiSelect ref={ref} options={mockOptions} />);

		expect(ref.current).toBeInstanceOf(HTMLSelectElement);
	});

	it('calls onChange when user selects option', async () => {
		const user = userEvent.setup();
		const handleChange = jest.fn();

		render(<UiSelect options={mockOptions} onChange={handleChange} />);

		const select = screen.getByRole('combobox');
		await user.selectOptions(select, 'option1');

		expect(handleChange).toHaveBeenCalled();
	});

	it('has proper accessibility attributes', () => {
		render(
			<UiSelect label="Test" options={mockOptions} error="Error message" id="test-select" />
		);

		const select = screen.getByLabelText('Test');

		expect(select).toHaveAttribute('aria-invalid', 'true');
		expect(select).toHaveAttribute('aria-describedby', 'test-select-error');
	});

	it('shows dropdown arrow icon', () => {
		render(<UiSelect options={mockOptions} />);

		const arrow = document.querySelector('svg');
		expect(arrow).toBeInTheDocument();
	});

	it('merges custom className', () => {
		render(<UiSelect options={mockOptions} className="custom-class" />);

		const select = screen.getByRole('combobox');
		expect(select).toHaveClass('custom-class');
		expect(select).toHaveClass('w-full'); // Also has base classes
	});

	it('handles value selection correctly', () => {
		const mockOnChange = jest.fn();
		render(<UiSelect options={mockOptions} value="option2" onChange={mockOnChange} />);

		const select = screen.getByRole('combobox') as HTMLSelectElement;
		expect(select.value).toBe('option2');
	});
});
