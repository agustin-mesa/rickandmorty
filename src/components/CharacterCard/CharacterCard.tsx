'use client';

import { motion } from 'framer-motion';
import { helpers } from '@/utils/helpers';
import { Character } from '@/repository/CharactersRepository';
import { CharacterImage } from '@/components';
import { useCharacterCard } from '@/hooks/useCharacterCard';
import { useConnectionsStore } from '@/store/connections';
import Image from 'next/image';
import { CHARACTER_CARD_ANIMATIONS } from './animations';

interface CharacterCardProps {
	character: Character;
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterCard({ character, positionCharacter }: CharacterCardProps) {
	const { handleCharacterClick } = useCharacterCard(character, positionCharacter);
	const { charactersSelected } = useConnectionsStore();

	const isSelected = charactersSelected[positionCharacter]?.id === character.id;

	const otherPosition = positionCharacter === 'FIRST' ? 'SECOND' : 'FIRST';
	const isSelectedInOtherSection = charactersSelected[otherPosition]?.id === character.id;
	const isDisabled = isSelectedInOtherSection && !isSelected;

	if (!character) {
		return (
			<motion.div
				className="flex items-center justify-center p-4"
				variants={CHARACTER_CARD_ANIMATIONS.characterCardVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="text-sm text-neutral-600">Character not found</div>
			</motion.div>
		);
	}

	return (
		<div
			className={helpers.cn(
				'group flex gap-4 transition-all duration-300 select-none',
				isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'
			)}
			onClick={handleCharacterClick}
			data-testid={`character-card-${character.id}`}
		>
			<div
				className={helpers.cn(
					'relative h-max transition-all group-hover:shadow-lg before:absolute before:inset-0 before:z-0 before:mt-0 before:-mr-2 before:-mb-1 before:ml-2 before:max-h-28 before:rotate-3 before:border before:border-neutral-700 before:bg-neutral-300',
					{
						'shadow-lg shadow-green-400': isSelected,
						'shadow-green-400 group-hover:shadow-lg': !isDisabled
					}
				)}
			>
				<div className="relative h-max transition-all">
					<CharacterImage src={character.image} alt={character.name} size={65} />
				</div>
			</div>

			<div
				className={helpers.cn('relative h-full flex-1 transition-all duration-300', {
					'bg-card-hover shadow-lg shadow-green-400': isSelected,
					'bg-card shadow-green-400': isDisabled,
					'bg-card group-hover:bg-card-hover shadow-green-400 group-hover:shadow-lg':
						!isDisabled
				})}
			>
				<div className="flex h-full flex-1 p-2">
					<div className="flex h-full flex-1 flex-col gap-2 border-t border-r border-amber-950/30 pt-1">
						<h1
							className="text-md line-clamp-1 leading-6 font-bold text-neutral-800"
							data-testid={`character-name-${character.id}`}
						>
							{character.name}
						</h1>
						<div className="flex flex-col gap-1">
							<div
								className="flex items-center gap-1"
								data-testid={`character-species-${character.id}`}
							>
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

							<div
								className="flex w-max items-center gap-1"
								data-testid={`character-status-${character.id}`}
							>
								<div className="bg-accent flex size-4 items-center justify-center rounded-full border">
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
