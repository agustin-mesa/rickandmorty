import { TableHeader } from '@/components/TableHeader';
import { Character } from '@/repository/CharactersRepository';
import { PaginationInfo } from '@/store/connections';
import { CharacterSectionContent } from '@/components/CharacterSectionContent';

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

			<CharacterSectionContent
				characters={characters}
				positionCharacter={positionCharacter}
				pagination={pagination}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
