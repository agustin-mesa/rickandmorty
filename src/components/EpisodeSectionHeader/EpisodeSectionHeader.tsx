import { CharacterImageDisplay } from '@/components/CharacterImageDisplay';

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
	return (
		<div className="relative flex flex-col items-center justify-center">
			<img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none h-full w-full object-cover select-none"
			/>
			<div className="absolute inset-0 flex items-center justify-center gap-4">
				<CharacterImageDisplay position="FIRST" showCondition={positionCharacter} />
				<h3 className="text-md text-[#CAB580]">{title}</h3>
				<CharacterImageDisplay position="SECOND" showCondition={positionCharacter} />
			</div>
		</div>
	);
}
