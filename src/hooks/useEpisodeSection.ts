import { useConnectionsStore } from '@/store/connections';
import { Episode } from '@/repository/EpisodesRepository';
import { helpers } from '@/utils/helpers';

/**
 * The function `useEpisodeSection` in TypeScript retrieves and categorizes episodes based on the
 * selected characters for display in a section.
 * @param {'FIRST' | 'SECOND' | 'BETWEEN'} positionCharacter - The `positionCharacter` parameter in the
 * `useEpisodeSection` function determines which section of episodes to display based on the selected
 * characters. It can have one of three values: 'FIRST', 'SECOND', or 'BETWEEN'.
 * @returns The `useEpisodeSection` function returns an object with the following properties:
 * - `title`: A string representing the title of the section based on the `positionCharacter`
 * parameter.
 * - `episodes`: An array of `Episode` objects based on the `positionCharacter` parameter.
 * - `hasSelectedCharacters`: A boolean indicating whether there are selected characters for the
 * section.
 * - `episodesLoading
 */
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
