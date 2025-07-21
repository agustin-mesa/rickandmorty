import { useState, useCallback, useEffect } from 'react';
import { EnumCharacterStatus, EnumCharacterGender } from '@/repository/CharactersRepository';

export interface CharacterFilters {
	name: string;
	status: EnumCharacterStatus | undefined;
	gender: EnumCharacterGender | undefined;
}

export interface UseCharacterFiltersProps {
	initialFilters?: Partial<CharacterFilters>;
	onFiltersChange?: (filters: Partial<CharacterFilters>) => void;
	onApplyFilters?: () => void;
	onResetFilters?: () => void;
}

export interface UseCharacterFiltersReturn {
	filters: CharacterFilters;
	hasActiveFilters: boolean;
	handleInputChange: (field: keyof CharacterFilters, value: string) => void;
	handleSelectChange: (field: keyof CharacterFilters, value: string) => void;
	handleReset: () => void;
	handleApply: () => void;
	updateFilters: (newFilters: Partial<CharacterFilters>) => void;
}

export const DEFAULT_FILTERS = {
	name: '',
	status: undefined as EnumCharacterStatus | undefined,
	gender: undefined as EnumCharacterGender | undefined
} as const;

/**
 * The function `useCharacterFilters` in TypeScript manages character filters with options to change,
 * reset, and apply filters.
 * @param {UseCharacterFiltersProps}  - The `useCharacterFilters` function is a custom React hook that
 * manages character filters for a specific application. It takes in several props to customize its
 * behavior:
 * @returns The `useCharacterFilters` function returns an object with the following properties:
 * - `filters`: The current filters object containing the character filters.
 * - `hasActiveFilters`: A boolean indicating whether there are active filters based on the values in
 * the filters object.
 * - `handleInputChange`: A function to handle input changes for a specific field in the filters.
 * - `handleSelectChange`: A function to handle
 */
export function useCharacterFilters({
	initialFilters = {},
	onFiltersChange,
	onApplyFilters,
	onResetFilters
}: UseCharacterFiltersProps = {}): UseCharacterFiltersReturn {
	const [filters, setFilters] = useState<CharacterFilters>({
		...DEFAULT_FILTERS,
		...initialFilters
	});

	useEffect(() => {
		setFilters({
			...DEFAULT_FILTERS,
			...initialFilters
		});
	}, [initialFilters]);

	const hasActiveFilters = Object.values(filters).some(
		(value) => value !== undefined && value !== ''
	);

	const updateFilters = useCallback(
		(newFilters: Partial<CharacterFilters>) => {
			setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
			onFiltersChange?.(newFilters);
		},
		[onFiltersChange]
	);

	const handleInputChange = useCallback(
		(field: keyof CharacterFilters, value: string) => {
			updateFilters({ [field]: value });
		},
		[updateFilters]
	);

	const handleSelectChange = useCallback(
		(field: keyof CharacterFilters, value: string) => {
			const processedValue = value || undefined;
			updateFilters({ [field]: processedValue });
		},
		[updateFilters]
	);

	const handleReset = useCallback(() => {
		setFilters(DEFAULT_FILTERS);
		onResetFilters?.();
	}, [onResetFilters]);

	const handleApply = useCallback(() => {
		onApplyFilters?.();
	}, [onApplyFilters]);

	return {
		filters,
		hasActiveFilters,
		handleInputChange,
		handleSelectChange,
		handleReset,
		handleApply,
		updateFilters
	};
}
