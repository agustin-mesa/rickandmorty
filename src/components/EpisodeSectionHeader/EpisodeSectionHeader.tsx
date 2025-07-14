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

	return (
		<div className="relative flex flex-col items-center justify-center">
			<img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none h-full w-full object-cover select-none"
			/>
			<div className="absolute inset-0 flex items-center justify-center gap-4">
				{charactersSelected?.FIRST &&
					(positionCharacter === 'FIRST' || positionCharacter === 'BETWEEN') && (
						<CharacterImage
							src={charactersSelected?.FIRST?.image}
							alt={charactersSelected?.FIRST?.name}
							className="-rotate-6"
						/>
					)}
				<h3 className="text-md text-[#CAB580]">{title}</h3>
				{charactersSelected?.SECOND &&
					(positionCharacter === 'SECOND' || positionCharacter === 'BETWEEN') && (
						<CharacterImage
							src={charactersSelected?.SECOND?.image}
							alt={charactersSelected?.SECOND?.name}
							className="rotate-6"
						/>
					)}
			</div>
		</div>
	);
}
