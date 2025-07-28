import { EnumCharacterStatus, EnumCharacterGender } from '@/repository/CharactersRepository';
import { SelectOption } from '@/components/ui';

export const CHARACTER_STATUS_OPTIONS: SelectOption[] = [
	{ value: '', label: 'All statuses' },
	{ value: EnumCharacterStatus.Alive, label: 'Alive' },
	{ value: EnumCharacterStatus.Dead, label: 'Dead' },
	{ value: EnumCharacterStatus.Unknown, label: 'Unknown' }
];

export const CHARACTER_GENDER_OPTIONS: SelectOption[] = [
	{ value: '', label: 'All genders' },
	{ value: EnumCharacterGender.Female, label: 'Female' },
	{ value: EnumCharacterGender.Male, label: 'Male' },
	{ value: EnumCharacterGender.Genderless, label: 'Genderless' },
	{ value: EnumCharacterGender.Unknown, label: 'Unknown' }
];
