import { Character, CharactersResponse } from '@/repository/CharactersRepository';
import { Episode, EpisodesRepository } from '@/repository/EpisodesRepository';
import { create } from 'zustand';

export interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	isLoading: boolean;
}

export interface FilteredEpisodes {
	firstCharacterOnly: Episode[];
	secondCharacterOnly: Episode[];
	shared: Episode[];
}

export interface ConnectionsStore {
	charactersSelected: Record<string, Character | null>;

	charactersDataFirst: CharactersResponse | null;
	charactersDataSecond: CharactersResponse | null;
	paginationFirst: PaginationInfo;
	paginationSecond: PaginationInfo;

	filteredEpisodes: FilteredEpisodes;
	episodesLoading: boolean;

	setCharacterSelected: (params: { character: Character; position: 'FIRST' | 'SECOND' }) => void;

	setCharactersDataFirst: (data: CharactersResponse) => void;
	setCharactersDataSecond: (data: CharactersResponse) => void;

	setPaginationFirst: (pagination: Partial<PaginationInfo>) => void;
	setPaginationSecond: (pagination: Partial<PaginationInfo>) => void;

	setFilteredEpisodes: (episodes: FilteredEpisodes) => void;
	setEpisodesLoading: (loading: boolean) => void;
	resetFilteredEpisodes: () => void;

	calculateFilteredEpisodes: () => void;
}

const createEmptyFilteredEpisodes = (): FilteredEpisodes => ({
	firstCharacterOnly: [],
	secondCharacterOnly: [],
	shared: []
});

const initialPaginationState: PaginationInfo = {
	currentPage: 1,
	totalPages: 1,
	isLoading: false
};

export const useConnectionsStore = create<ConnectionsStore>((set, get) => ({
	charactersSelected: {
		FIRST: null,
		SECOND: null
	},

	charactersDataFirst: null,
	charactersDataSecond: null,

	paginationFirst: { ...initialPaginationState },
	paginationSecond: { ...initialPaginationState },

	filteredEpisodes: createEmptyFilteredEpisodes(),
	episodesLoading: false,

	setCharacterSelected: (params) => {
		const { charactersSelected } = get();

		if (charactersSelected[params.position]?.id === params.character.id) {
			return;
		}

		set({
			charactersSelected: {
				...charactersSelected,
				[params.position]: params.character
			}
		});

		get().resetFilteredEpisodes();
	},

	setCharactersDataFirst: (data) => set({ charactersDataFirst: data }),
	setCharactersDataSecond: (data) => set({ charactersDataSecond: data }),

	setPaginationFirst: (pagination) =>
		set({
			paginationFirst: {
				...get().paginationFirst,
				...pagination
			}
		}),

	setPaginationSecond: (pagination) =>
		set({
			paginationSecond: {
				...get().paginationSecond,
				...pagination
			}
		}),

	setFilteredEpisodes: (episodes) => set({ filteredEpisodes: episodes }),
	setEpisodesLoading: (loading) => set({ episodesLoading: loading }),
	resetFilteredEpisodes: () => set({ filteredEpisodes: createEmptyFilteredEpisodes() }),

	calculateFilteredEpisodes: async () => {
		const { charactersSelected, setEpisodesLoading, setFilteredEpisodes } = get();
		const firstCharacter = charactersSelected.FIRST;
		const secondCharacter = charactersSelected.SECOND;

		if (!firstCharacter && !secondCharacter) {
			setFilteredEpisodes(createEmptyFilteredEpisodes());
			return;
		}

		setEpisodesLoading(true);

		try {
			const episodesRepo = new EpisodesRepository();

			const firstEpisodeIds = firstCharacter
				? episodesRepo.extractIdsFromUrls(firstCharacter.episode)
				: [];
			const secondEpisodeIds = secondCharacter
				? episodesRepo.extractIdsFromUrls(secondCharacter.episode)
				: [];

			const allEpisodeIds = [...new Set([...firstEpisodeIds, ...secondEpisodeIds])];

			if (allEpisodeIds.length === 0) {
				setFilteredEpisodes(createEmptyFilteredEpisodes());
				return;
			}

			const allEpisodes = await episodesRepo.getEpisodesByIds({ ids: allEpisodeIds });

			const firstCharacterOnly = allEpisodes.filter(
				(episode) =>
					firstEpisodeIds.includes(episode.id) && !secondEpisodeIds.includes(episode.id)
			);

			const secondCharacterOnly = allEpisodes.filter(
				(episode) =>
					secondEpisodeIds.includes(episode.id) && !firstEpisodeIds.includes(episode.id)
			);

			const shared = allEpisodes.filter(
				(episode) =>
					firstEpisodeIds.includes(episode.id) && secondEpisodeIds.includes(episode.id)
			);

			setFilteredEpisodes({
				firstCharacterOnly,
				secondCharacterOnly,
				shared
			});
		} catch (error) {
			console.error('Error calculating filtered episodes:', error);
			setFilteredEpisodes(createEmptyFilteredEpisodes());
		} finally {
			setEpisodesLoading(false);
		}
	}
}));
