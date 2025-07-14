'use client';

import { EpisodeSectionHeader } from '@/components/EpisodeSectionHeader';
import { EpisodeContent } from '@/components/EpisodeContent';
import { useEpisodeSection } from '@/hooks/useEpisodeSection';

interface EpisodeSectionProps {
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND' | 'BETWEEN';
}

export default function EpisodeSection({
	imageSrc,
	imageAlt,
	positionCharacter
}: EpisodeSectionProps) {
	const { title, episodes, hasSelectedCharacters, episodesLoading } =
		useEpisodeSection(positionCharacter);

	return (
		<div className="flex flex-1 flex-col gap-2">
			<EpisodeSectionHeader
				imageSrc={imageSrc}
				imageAlt={imageAlt}
				positionCharacter={positionCharacter}
				title={title}
			/>
			<div className="flex gap-4">
				<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
					<div className="h-full flex-1 bg-[#5A7580] p-2">
						<div className="relative h-full flex-1 bg-[#FFEFD8]">
							<div className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2">
								<EpisodeContent
									episodes={episodes}
									loading={episodesLoading}
									hasSelectedCharacters={hasSelectedCharacters}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
