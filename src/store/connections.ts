import { Character, CharactersResponse } from '@/repository/CharactersRepository';
import { Episode } from '@/repository/EpisodesRepository';
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
	// Personajes seleccionados
	charactersSelected: Record<string, Character | null>;

	// Datos de paginación para personajes - cada sección tiene su propia data
	charactersDataFirst: CharactersResponse | null;
	charactersDataSecond: CharactersResponse | null;
	paginationFirst: PaginationInfo;
	paginationSecond: PaginationInfo;

	// Episodios filtrados
	filteredEpisodes: FilteredEpisodes;
	episodesLoading: boolean;

	// Acciones
	setCharacterSelected: (params: { character: Character; position: 'FIRST' | 'SECOND' }) => void;

	setCharactersDataFirst: (data: CharactersResponse) => void;
	setCharactersDataSecond: (data: CharactersResponse) => void;

	setPaginationFirst: (pagination: Partial<PaginationInfo>) => void;
	setPaginationSecond: (pagination: Partial<PaginationInfo>) => void;

	setFilteredEpisodes: (episodes: FilteredEpisodes) => void;
	setEpisodesLoading: (loading: boolean) => void;

	// Función para obtener episodios filtrados
	calculateFilteredEpisodes: () => void;
}

const createEmptyFilteredEpisodes = (): FilteredEpisodes => ({
	firstCharacterOnly: [],
	secondCharacterOnly: [],
	shared: []
});

export const useConnectionsStore = create<ConnectionsStore>((set, get) => ({
	charactersSelected: {
		FIRST: null,
		SECOND: null
	},

	charactersDataFirst: null,
	charactersDataSecond: null,

	paginationFirst: {
		currentPage: 1,
		totalPages: 1,
		isLoading: false
	},

	paginationSecond: {
		currentPage: 1,
		totalPages: 1,
		isLoading: false
	},

	filteredEpisodes: createEmptyFilteredEpisodes(),

	episodesLoading: false,

	setCharacterSelected: (params) => {
		set({
			charactersSelected: {
				...get().charactersSelected,
				[params.position]: params.character
			}
		});

		setTimeout(() => {
			get().calculateFilteredEpisodes();
		}, 0);
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

	calculateFilteredEpisodes: async () => {
		const { charactersSelected } = get();
		const firstCharacter = charactersSelected.FIRST;
		const secondCharacter = charactersSelected.SECOND;

		if (!firstCharacter && !secondCharacter) {
			set({ filteredEpisodes: createEmptyFilteredEpisodes() });
			return;
		}

		set({ episodesLoading: true });

		try {
			const { EpisodesRepository } = await import('@/repository/EpisodesRepository');
			const episodesRepo = new EpisodesRepository();

			const firstEpisodeIds = firstCharacter
				? episodesRepo.extractIdsFromUrls(firstCharacter.episode)
				: [];
			const secondEpisodeIds = secondCharacter
				? episodesRepo.extractIdsFromUrls(secondCharacter.episode)
				: [];

			const allEpisodeIds = [...new Set([...firstEpisodeIds, ...secondEpisodeIds])];

			if (allEpisodeIds.length === 0) {
				set({ filteredEpisodes: createEmptyFilteredEpisodes() });
				return;
			}

			const allEpisodes = await episodesRepo.getEpisodesByIds(allEpisodeIds);

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

			set({
				filteredEpisodes: {
					firstCharacterOnly,
					secondCharacterOnly,
					shared
				}
			});
		} catch (error) {
			console.error('Error calculating filtered episodes:', error);
			set({ filteredEpisodes: createEmptyFilteredEpisodes() });
		} finally {
			set({ episodesLoading: false });
		}
	}
}));
