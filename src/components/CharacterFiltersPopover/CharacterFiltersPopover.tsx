'use client';

import { memo } from 'react';
import { EnumCharacterStatus, EnumCharacterGender } from '@/repository/CharactersRepository';
import {
	UiPopover,
	UiPopoverHeader,
	UiPopoverFooter,
	UiPopoverClearButton
} from '@/components/ui/UiPopover';
import { useCharacterFilters, type CharacterFilters } from '@/hooks/useCharacterFilters';
import { CharacterFiltersForm } from '@/components/CharacterFiltersForm';

export interface CharacterFiltersPopoverProps {
	filters: {
		name?: string;
		status?: EnumCharacterStatus;
		gender?: EnumCharacterGender;
	};
	onFiltersChange: (filters: Partial<CharacterFilters>) => void;
	onApplyFilters: () => void;
	onResetFilters: () => void;
	isLoading?: boolean;
	isOpen: boolean;
	onClose: () => void;
	triggerRef?: React.RefObject<HTMLElement | null>;
}

const CharacterFiltersPopover = memo<CharacterFiltersPopoverProps>(
	({
		filters: externalFilters,
		onFiltersChange,
		onApplyFilters,
		onResetFilters,
		isLoading = false,
		isOpen,
		onClose,
		triggerRef
	}) => {
		const {
			filters,
			hasActiveFilters,
			handleInputChange,
			handleSelectChange,
			handleReset,
			handleApply
		} = useCharacterFilters({
			initialFilters: externalFilters,
			onFiltersChange,
			onApplyFilters: () => {
				onApplyFilters();
				onClose();
			},
			onResetFilters
		});

		const handleResetClick = () => {
			handleReset();
			onResetFilters();
		};

		return (
			<UiPopover
				isOpen={isOpen}
				onClose={onClose}
				triggerRef={triggerRef}
				contentClassName="p-6 w-full max-w-sm"
			>
				{/* Header */}
				<UiPopoverHeader title="Filters" onClose={onClose} isLoading={isLoading}>
					<UiPopoverClearButton
						onClick={handleResetClick}
						isVisible={hasActiveFilters}
						isLoading={isLoading}
					/>
				</UiPopoverHeader>

				{/* Filter Controls */}
				<CharacterFiltersForm
					filters={filters}
					onNameChange={(value) => handleInputChange('name', value)}
					onStatusChange={(value) => handleSelectChange('status', value)}
					onGenderChange={(value) => handleSelectChange('gender', value)}
					isLoading={isLoading}
				/>

				{/* Footer */}
				<UiPopoverFooter
					onCancel={onClose}
					onConfirm={handleApply}
					confirmText="Apply Filters"
					isLoading={isLoading}
				/>
			</UiPopover>
		);
	}
);

CharacterFiltersPopover.displayName = 'CharacterFiltersPopover';

export default CharacterFiltersPopover;
