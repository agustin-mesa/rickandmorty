'use client';

import { motion } from 'framer-motion';
import { EpisodeSectionHeader } from '@/components/EpisodeSectionHeader';
import { EpisodeContent } from '@/components/EpisodeContent';
import { useEpisodeSection } from '@/hooks/useEpisodeSection';
import { episodeSectionVariants, episodeContentVariants } from './animations';

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
			variants={episodeSectionVariants}
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
				<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
					<div className="h-full flex-1 bg-[#5A7580] p-2">
						<div className="relative h-full flex-1 bg-[#FFEFD8]">
							<motion.div
								className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2"
								variants={episodeContentVariants}
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
