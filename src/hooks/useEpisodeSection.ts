import { useConnectionsStore } from '@/store/connections';
import { Episode } from '@/repository/EpisodesRepository';
import { helpers } from '@/utils/helpers';

export function useEpisodeSection(positionCharacter: 'FIRST' | 'SECOND' | 'BETWEEN') {
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

	const episodes = getEpisodesForSection();
	const hasSelectedCharacters = charactersSelected.FIRST || charactersSelected.SECOND;

	return {
		title: titles[positionCharacter],
		episodes,
		hasSelectedCharacters: !!hasSelectedCharacters,
		episodesLoading
	};
}
