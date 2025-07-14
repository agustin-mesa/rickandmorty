import { CharacterCard } from '@/components/CharacterCard';
import { TableHeader } from '@/components/TableHeader';
import { Character } from '@/repository/CharactersRepository';

interface CharacterSectionProps {
	characters: Character[];
	title: string;
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterSection({
	characters,
	title,
	imageSrc,
	imageAlt,
	positionCharacter
}: CharacterSectionProps) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<TableHeader title={title} imageSrc={imageSrc} imageAlt={imageAlt} />
			<div className="z-50 grid max-h-[40vh] grid-cols-2 gap-4 overflow-y-auto px-4 max-xl:grid-cols-1">
				{characters?.map((character) => (
					<CharacterCard
						key={character.id}
						character={character}
						positionCharacter={positionCharacter}
					/>
				))}
			</div>
		</div>
	);
}
