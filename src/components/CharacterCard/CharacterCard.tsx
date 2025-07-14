'use client';

import Image from 'next/image';
import { helpers } from '@/utils/helpers';
import { Character } from '@/repository/CharactersRepository';
import { useConnectionsStore } from '@/store/connections';

interface CharacterCardProps {
	character: Character;
	positionCharacter: 'FIRST' | 'SECOND';
}

export default function CharacterCard({ character, positionCharacter }: CharacterCardProps) {
	const { setCharacterSelected } = useConnectionsStore();

	const playClickSound = () => {
		try {
			const audio = new Audio('/sounds/selected-click.mp3');
			audio.volume = 0.5;
			audio.play().catch((error) => {
				console.warn('Error playing sound:', error);
			});
		} catch (error) {
			console.warn('Error creating audio:', error);
		}
	};

	const handleCharacterClick = () => {
		playClickSound();
		setCharacterSelected({ character, position: positionCharacter });
	};

	const renderCharacterInfo = () => {
		if (!character) return null;

		return (
			<div className="flex h-full flex-1 flex-col gap-2 border-t border-r border-amber-950/30 pt-1 pr-2">
				<h1 className="text-md line-clamp-2 leading-6 font-bold text-neutral-800">
					{character.name}
				</h1>

				<div className="flex w-max items-center gap-2">
					<div className="flex size-5 items-center justify-center rounded-full border bg-[#84683D]">
						<div
							className={helpers.cn(
								'size-3 rounded-full border',
								helpers.character.getStatusColor(character.status)
							)}
						/>
					</div>
					<span className="text-xs text-neutral-800 capitalize">
						{character.status} - {character.species}
					</span>
				</div>
			</div>
		);
	};

	if (!character) {
		return (
			<div className="flex items-center justify-center p-4">
				<div className="text-sm text-neutral-600">Character not found</div>
			</div>
		);
	}

	return (
		<div
			className="group flex cursor-pointer gap-4 transition-all duration-300 select-none hover:scale-105"
			onClick={handleCharacterClick}
		>
			<div className="relative h-max shadow-green-400 transition-all group-hover:shadow-lg before:absolute before:inset-0 before:z-0 before:mt-0 before:-mr-2 before:-mb-1 before:ml-2 before:max-h-28 before:rotate-3 before:border before:border-neutral-700 before:bg-neutral-300">
				<div className="relative z-10 border border-neutral-700 bg-neutral-200 p-1 pb-4">
					<Image
						src={character.image}
						alt={character.name}
						width={70}
						height={70}
						draggable={false}
						className="border border-neutral-700 select-none max-xl:!h-14 max-xl:!w-14"
					/>
				</div>
			</div>
			<div className="h-full flex-1 border border-neutral-700 shadow-green-400 transition-all group-hover:shadow-md">
				<div className="relative h-full flex-1 bg-[#FFEFD8] transition-all duration-300 group-hover:bg-[#FFE0B4]">
					<div className="flex h-full flex-1 p-2">{renderCharacterInfo()}</div>
				</div>
			</div>
		</div>
	);
}
