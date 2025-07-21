import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/repository/CharactersRepository';
import { CharacterListWrapper } from '@/components/CharacterListWrapper';

interface CharacterListProps {
	characters: Character[];
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterList({ characters, positionCharacter }: CharacterListProps) {
	if (!characters || !characters.length) {
		return (
			<div className="flex items-center justify-center p-4">
				<div className="text-sm text-neutral-600">No characters found</div>
			</div>
		);
	}

	return (
		<CharacterListWrapper>
			{characters.map((character) => (
				<CharacterCard
					key={character.id}
					character={character}
					positionCharacter={positionCharacter}
				/>
			))}
		</CharacterListWrapper>
	);
}
