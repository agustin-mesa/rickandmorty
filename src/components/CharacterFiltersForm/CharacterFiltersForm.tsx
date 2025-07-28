import { memo } from 'react';
import { EnumCharacterStatus, EnumCharacterGender } from '@/repository/CharactersRepository';
import { UiInput, UiSelect } from '@/components/ui';
import { CHARACTER_STATUS_OPTIONS, CHARACTER_GENDER_OPTIONS } from '@/constants/character-filters';
import { helpers } from '@/utils/helpers';

export interface CharacterFiltersFormProps {
	filters: {
		name?: string;
		status?: EnumCharacterStatus;
		gender?: EnumCharacterGender;
	};
	onNameChange: (value: string) => void;
	onStatusChange: (value: string) => void;
	onGenderChange: (value: string) => void;
	isLoading?: boolean;
	className?: string;
}

const CharacterFiltersForm = memo<CharacterFiltersFormProps>(
	({
		filters,
		onNameChange,
		onStatusChange,
		onGenderChange,
		isLoading = false,
		className = ''
	}) => (
		<div className={helpers.cn('space-y-4', className)}>
			<UiInput
				label="Name"
				placeholder="Search by name..."
				value={filters.name || ''}
				onChange={(e) => onNameChange(e.target.value)}
				disabled={isLoading}
			/>

			<div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
				<UiSelect
					label="Status"
					options={CHARACTER_STATUS_OPTIONS}
					value={filters.status || ''}
					onChange={(e) => onStatusChange(e.target.value)}
					disabled={isLoading}
				/>

				<UiSelect
					label="Gender"
					options={CHARACTER_GENDER_OPTIONS}
					value={filters.gender || ''}
					onChange={(e) => onGenderChange(e.target.value)}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
);

CharacterFiltersForm.displayName = 'CharacterFiltersForm';

export default CharacterFiltersForm;
