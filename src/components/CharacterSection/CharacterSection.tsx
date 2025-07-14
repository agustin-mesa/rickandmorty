import { CharacterList } from '@/components/CharacterList';
import { UiPagination } from '@/components/ui/UiPagination';
import { TableHeader } from '@/components/TableHeader';
import { Character } from '@/repository/CharactersRepository';
import { PaginationInfo } from '@/store/connections';

interface CharacterSectionProps {
	characters: Character[];
	title: string;
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND';
	pagination: PaginationInfo;
	onPageChange: (page: number) => void;
}

export default function CharacterSection({
	characters,
	title,
	imageSrc,
	imageAlt,
	positionCharacter,
	pagination,
	onPageChange
}: CharacterSectionProps) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<TableHeader title={title} imageSrc={imageSrc} imageAlt={imageAlt} />

			<div className="z-50 grid max-h-[40vh] grid-cols-2 gap-4 overflow-y-auto px-4 max-xl:grid-cols-1">
				<CharacterList characters={characters} positionCharacter={positionCharacter} />
			</div>

			<UiPagination
				currentPage={pagination.currentPage}
				totalPages={pagination.totalPages}
				onPageChange={onPageChange}
				isLoading={pagination.isLoading}
			/>
		</div>
	);
}
