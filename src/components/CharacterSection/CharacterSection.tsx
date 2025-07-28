import { useState, useRef } from 'react';
import { TableHeader } from '@/components';
import {
	Character,
	EnumCharacterStatus,
	EnumCharacterGender
} from '@/repository/CharactersRepository';
import { PaginationInfo } from '@/store/connections';
import { CharacterSectionContent, CharacterFiltersPopover } from '@/components';

interface CharacterSectionProps {
	characters: Character[];
	title: string;
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND';
	pagination: PaginationInfo;
	filters: {
		name?: string;
		status?: EnumCharacterStatus;
		gender?: EnumCharacterGender;
	};
	onPageChange: (page: number) => void;
	onFiltersChange: (
		filters: Partial<{
			name?: string;
			status?: EnumCharacterStatus;
			gender?: EnumCharacterGender;
		}>
	) => void;
	onApplyFilters: () => void;
	onResetFilters: () => void;
}

export default function CharacterSection({
	characters,
	title,
	imageSrc,
	imageAlt,
	positionCharacter,
	pagination,
	filters,
	onPageChange,
	onFiltersChange,
	onApplyFilters,
	onResetFilters
}: CharacterSectionProps) {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const filterButtonRef = useRef<HTMLDivElement>(null);

	const hasActiveFilters = Object.values(filters).some(
		(value) => value !== undefined && value !== ''
	);

	const handleFiltersToggle = () => {
		setIsFiltersOpen(!isFiltersOpen);
	};

	const handleFiltersClose = () => {
		setIsFiltersOpen(false);
	};

	return (
		<div className="relative flex flex-1 flex-col gap-2">
			<div ref={filterButtonRef}>
				<TableHeader
					title={title}
					imageSrc={imageSrc}
					imageAlt={imageAlt}
					onFiltersClick={handleFiltersToggle}
					hasActiveFilters={hasActiveFilters}
				/>
			</div>

			<CharacterFiltersPopover
				filters={filters}
				onFiltersChange={onFiltersChange}
				onApplyFilters={onApplyFilters}
				onResetFilters={onResetFilters}
				isLoading={pagination.isLoading}
				isOpen={isFiltersOpen}
				onClose={handleFiltersClose}
				triggerRef={filterButtonRef}
			/>

			<CharacterSectionContent
				characters={characters}
				positionCharacter={positionCharacter}
				pagination={pagination}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
