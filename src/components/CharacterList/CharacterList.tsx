import { motion } from 'framer-motion';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/repository/CharactersRepository';
import {
	characterListVariants,
	characterListItemVariants,
	noCharactersVariants
} from './animations';

interface CharacterListProps {
	characters: Character[];
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterList({ characters, positionCharacter }: CharacterListProps) {
	if (!characters || characters.length === 0) {
		return (
			<motion.div
				className="flex items-center justify-center p-4"
				variants={noCharactersVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="text-sm text-neutral-600">No characters found</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			variants={characterListVariants}
			initial="hidden"
			animate="visible"
			className="contents"
		>
			{characters.map((character) => (
				<motion.div key={character.id} variants={characterListItemVariants}>
					<CharacterCard character={character} positionCharacter={positionCharacter} />
				</motion.div>
			))}
		</motion.div>
	);
}
