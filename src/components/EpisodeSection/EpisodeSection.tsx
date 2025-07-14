'use client';

import { EpisodeItem } from '@/components/EpisodeItem';
import { Episode } from '@/repository/EpisodesRepository';
import { useConnectionsStore } from '@/store/connections';
import { EpisodeSectionHeader } from '@/components/EpisodeSectionHeader';
import { helpers } from '@/utils/helpers';

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
	const { charactersSelected, filteredEpisodes, episodesLoading } = useConnectionsStore();

	const titles = {
		FIRST: `Only ${helpers.string.getFirstWord(charactersSelected?.FIRST?.name)} Episodes`,
		SECOND: `Only ${helpers.string.getFirstWord(charactersSelected?.SECOND?.name)} Episodes`,
		BETWEEN: 'Shared Episodes'
	};

	const getEpisodesForSection = (): Episode[] => {
		switch (positionCharacter) {
			case 'FIRST':
				return filteredEpisodes.firstCharacterOnly;
			case 'SECOND':
				return filteredEpisodes.secondCharacterOnly;
			case 'BETWEEN':
				return filteredEpisodes.shared;
			default:
				return [];
		}
	};

	const renderEpisodeContent = () => {
		if (episodesLoading) {
			return (
				<div className="flex items-center justify-center p-4">
					<div className="text-sm text-neutral-600">Loading episodes...</div>
				</div>
			);
		}

		const episodes = getEpisodesForSection();

		if (episodes.length === 0) {
			const hasSelectedCharacters = charactersSelected.FIRST || charactersSelected.SECOND;
			const message = hasSelectedCharacters
				? 'No episodes found for this selection'
				: 'Select characters to see episodes';

			return (
				<div className="flex items-center justify-center p-4">
					<div className="text-sm text-neutral-600">{message}</div>
				</div>
			);
		}

		return episodes.map((episode) => <EpisodeItem key={episode.id} episode={episode} />);
	};

	return (
		<div className="flex flex-1 flex-col gap-2">
			<EpisodeSectionHeader
				imageSrc={imageSrc}
				imageAlt={imageAlt}
				positionCharacter={positionCharacter}
				title={titles[positionCharacter]}
			/>
			<div className="flex gap-4">
				<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
					<div className="h-full flex-1 bg-[#5A7580] p-2">
						<div className="relative h-full flex-1 bg-[#FFEFD8]">
							<div className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2">
								{renderEpisodeContent()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
