'use client';

import { CharacterImage } from '@/components/CharacterImage';
import { useConnectionsStore } from '@/store/connections';

interface EpisodeSectionHeaderProps {
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND' | 'BETWEEN';
	title: string;
}

export default function EpisodeSectionHeader({
	imageSrc,
	imageAlt,
	positionCharacter,
	title
}: EpisodeSectionHeaderProps) {
	const { charactersSelected } = useConnectionsStore();

	const renderFirstCharacterImage = () => {
		if (!charactersSelected?.FIRST) return null;
		if (positionCharacter !== 'FIRST' && positionCharacter !== 'BETWEEN') return null;

		return (
			<CharacterImage
				src={charactersSelected.FIRST.image}
				alt={charactersSelected.FIRST.name}
				className="-rotate-6"
			/>
		);
	};

	const renderSecondCharacterImage = () => {
		if (!charactersSelected?.SECOND) return null;
		if (positionCharacter !== 'SECOND' && positionCharacter !== 'BETWEEN') return null;

		return (
			<CharacterImage
				src={charactersSelected.SECOND.image}
				alt={charactersSelected.SECOND.name}
				className="rotate-6"
			/>
		);
	};

	return (
		<div className="relative flex flex-col items-center justify-center">
			<img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none h-full w-full object-cover select-none"
			/>
			<div className="absolute inset-0 flex items-center justify-center gap-4">
				{renderFirstCharacterImage()}
				<h3 className="text-md text-[#CAB580]">{title}</h3>
				{renderSecondCharacterImage()}
			</div>
		</div>
	);
}
