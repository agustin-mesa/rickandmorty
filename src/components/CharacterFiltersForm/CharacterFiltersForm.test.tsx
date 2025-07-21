import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterFiltersForm } from './index';
import { EnumCharacterStatus, EnumCharacterGender } from '@/repository/CharactersRepository';

const defaultProps = {
	filters: {
		name: '',
		status: undefined,
		gender: undefined
	},
	onNameChange: jest.fn(),
	onStatusChange: jest.fn(),
	onGenderChange: jest.fn()
};

describe('CharacterFiltersForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders all filter controls', () => {
		render(<CharacterFiltersForm {...defaultProps} />);

		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
	});

	it('displays current filter values', () => {
		const filtersWithValues = {
			name: 'Rick Sanchez',
			status: EnumCharacterStatus.Alive,
			gender: EnumCharacterGender.Male
		};

		render(<CharacterFiltersForm {...defaultProps} filters={filtersWithValues} />);

		expect(screen.getByDisplayValue('Rick Sanchez')).toBeInTheDocument();
		expect(screen.getByDisplayValue('Alive')).toBeInTheDocument();
		expect(screen.getByDisplayValue('Male')).toBeInTheDocument();
	});

	it('calls onNameChange when name input changes', async () => {
		const user = userEvent.setup();
		const onNameChange = jest.fn();

		render(<CharacterFiltersForm {...defaultProps} onNameChange={onNameChange} />);

		const nameInput = screen.getByLabelText(/name/i);
		await user.type(nameInput, 'Morty');

		expect(onNameChange).toHaveBeenCalledWith('M');
		expect(onNameChange).toHaveBeenCalledWith('o');
		expect(onNameChange).toHaveBeenCalledWith('r');
		expect(onNameChange).toHaveBeenCalledWith('t');
		expect(onNameChange).toHaveBeenCalledWith('y');
	});

	it('calls onStatusChange when status select changes', async () => {
		const user = userEvent.setup();
		const onStatusChange = jest.fn();

		render(<CharacterFiltersForm {...defaultProps} onStatusChange={onStatusChange} />);

		const statusSelect = screen.getByLabelText(/status/i);
		await user.selectOptions(statusSelect, 'Dead');

		expect(onStatusChange).toHaveBeenCalledWith('Dead');
	});

	it('calls onGenderChange when gender select changes', async () => {
		const user = userEvent.setup();
		const onGenderChange = jest.fn();

		render(<CharacterFiltersForm {...defaultProps} onGenderChange={onGenderChange} />);

		const genderSelect = screen.getByLabelText(/gender/i);
		await user.selectOptions(genderSelect, 'Female');

		expect(onGenderChange).toHaveBeenCalledWith('Female');
	});

	it('disables all controls when loading', () => {
		render(<CharacterFiltersForm {...defaultProps} isLoading={true} />);

		expect(screen.getByLabelText(/name/i)).toBeDisabled();
		expect(screen.getByLabelText(/status/i)).toBeDisabled();
		expect(screen.getByLabelText(/gender/i)).toBeDisabled();
	});

	it('applies custom className', () => {
		const { container } = render(
			<CharacterFiltersForm {...defaultProps} className="custom-class" />
		);

		expect(container.querySelector('.custom-class')).toBeInTheDocument();
	});

	it('handles empty filter values correctly', () => {
		const emptyFilters = {
			name: undefined,
			status: undefined,
			gender: undefined
		};

		render(<CharacterFiltersForm {...defaultProps} filters={emptyFilters} />);

		const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
		const statusSelect = screen.getByLabelText(/status/i) as HTMLSelectElement;
		const genderSelect = screen.getByLabelText(/gender/i) as HTMLSelectElement;

		expect(nameInput.value).toBe('');
		expect(statusSelect.value).toBe('');
		expect(genderSelect.value).toBe('');
	});

	it('preserves focus behavior on user interactions', async () => {
		const user = userEvent.setup();
		render(<CharacterFiltersForm {...defaultProps} />);

		const nameInput = screen.getByLabelText(/name/i);
		await user.click(nameInput);

		expect(nameInput).toHaveFocus();
	});

	describe('accessibility', () => {
		it('has proper labels for all inputs', () => {
			render(<CharacterFiltersForm {...defaultProps} />);

			expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
		});

		it('maintains proper tab order', async () => {
			const user = userEvent.setup();
			render(<CharacterFiltersForm {...defaultProps} />);

			const nameInput = screen.getByLabelText(/name/i);
			const statusSelect = screen.getByLabelText(/status/i);
			const genderSelect = screen.getByLabelText(/gender/i);

			await user.tab();
			expect(nameInput).toHaveFocus();

			await user.tab();
			expect(statusSelect).toHaveFocus();

			await user.tab();
			expect(genderSelect).toHaveFocus();
		});
	});
});
