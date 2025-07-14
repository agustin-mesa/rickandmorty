'use client';

import { motion } from 'framer-motion';
import { helpers } from '@/utils/helpers';
import { Character } from '@/repository/CharactersRepository';
import { CharacterImage } from '@/components/CharacterImage';
import { useCharacterCard } from '@/hooks/useCharacterCard';
import { useConnectionsStore } from '@/store/connections';
import Image from 'next/image';
import { characterCardVariants } from './animations';

interface CharacterCardProps {
	character: Character;
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterCard({ character, positionCharacter }: CharacterCardProps) {
	const { handleCharacterClick } = useCharacterCard(character, positionCharacter);
	const { charactersSelected } = useConnectionsStore();

	const isSelected = charactersSelected[positionCharacter]?.id === character.id;

	if (!character) {
		return (
			<motion.div
				className="flex items-center justify-center p-4"
				variants={characterCardVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="text-sm text-neutral-600">Character not found</div>
			</motion.div>
		);
	}

	return (
		<div
			className="group flex cursor-pointer gap-4 transition-all duration-300 select-none hover:scale-105"
			onClick={handleCharacterClick}
		>
			<div
				className={helpers.cn(
					'relative h-max transition-all',
					isSelected
						? 'shadow-lg shadow-green-400'
						: 'shadow-green-400 group-hover:shadow-lg'
				)}
			>
				<CharacterImage src={character.image} alt={character.name} size={60} />
			</div>

			<div
				className={helpers.cn(
					'relative h-full flex-1 transition-all duration-300',
					isSelected
						? 'bg-[#FFE0B4] shadow-lg shadow-green-400'
						: 'bg-[#FFEFD8] shadow-green-400 group-hover:bg-[#FFE0B4] group-hover:shadow-lg'
				)}
			>
				<div className="flex h-full flex-1 p-2">
					<div className="flex h-full flex-1 flex-col gap-2 border-t border-r border-amber-950/30 pt-1">
						<h1 className="text-md line-clamp-2 leading-6 font-bold text-neutral-800">
							{character.name}
						</h1>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-1">
								<Image
									src="/assets/icons/species.svg"
									alt="species"
									width={16}
									height={16}
								/>
								<span className="line-clamp-1 max-w-36 text-xs text-neutral-800 capitalize">
									{character.species}
								</span>
							</div>

							<div className="flex w-max items-center gap-1">
								<div className="flex size-4 items-center justify-center rounded-full border bg-[#84683D]">
									<div
										className={helpers.cn(
											'size-2.5 rounded-full border',
											helpers.character.getStatusColor(character.status)
										)}
									/>
								</div>

								<span className="text-xs text-neutral-800 capitalize">
									{character.status}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
