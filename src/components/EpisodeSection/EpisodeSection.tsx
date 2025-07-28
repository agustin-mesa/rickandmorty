'use client';

import { motion } from 'framer-motion';
import { EpisodeSectionHeader, EpisodeContent } from '@/components';
import { useEpisodeSection } from '@/hooks/useEpisodeSection';
import { EPISODE_SECTION_ANIMATIONS } from './animations';

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
		<motion.div
			className="flex flex-1 flex-col gap-2"
			variants={EPISODE_SECTION_ANIMATIONS.episodeSectionVariants}
			initial="hidden"
			animate="visible"
		>
			<EpisodeSectionHeader
				imageSrc={imageSrc}
				imageAlt={imageAlt}
				positionCharacter={positionCharacter}
				title={title}
			/>
			<div className="flex gap-4">
				<div className="bg-episode-primary flex-1 border border-neutral-700 pr-1 pb-1">
					<div className="bg-episode-secondary h-full flex-1 p-2">
						<div className="bg-card relative h-full flex-1">
							<motion.div
								className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2"
								variants={EPISODE_SECTION_ANIMATIONS.episodeContentVariants}
								initial="hidden"
								animate="visible"
							>
								<EpisodeContent
									episodes={episodes}
									loading={episodesLoading}
									hasSelectedCharacters={hasSelectedCharacters}
								/>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
