/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook } from '@testing-library/react';
import { useEpisodeSection } from '../useEpisodeSection';
import { Character, EnumCharacterStatus } from '@/repository/CharactersRepository';
import { Episode } from '@/repository/EpisodesRepository';

// Mock store
const mockStore = {
	charactersSelected: {
		FIRST: null as Character | null,
		SECOND: null as Character | null
	},
	filteredEpisodes: {
		firstCharacterOnly: [] as Episode[],
		secondCharacterOnly: [] as Episode[],
		shared: [] as Episode[]
	},
	episodesLoading: false
};

jest.mock('@/store/connections', () => ({
	useConnectionsStore: jest.fn(() => mockStore)
}));

// Mock helpers
jest.mock('@/utils/helpers', () => ({
	helpers: {
		string: {
			getFirstWord: jest.fn((name: string) => name?.split(' ')[0] || '')
		}
	}
}));

describe('useEpisodeSection', () => {
	const mockCharacter1: Character = {
		id: 1,
		name: 'Rick Sanchez',
		status: EnumCharacterStatus.Alive,
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
		location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		episode: []
	};

	const mockCharacter2: Character = {
		...mockCharacter1,
		id: 2,
		name: 'Morty Smith',
		image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
	};

	const mockEpisodes: Episode[] = [
		{
			id: 1,
			name: 'Pilot',
			air_date: 'December 2, 2013',
			episode: 'S01E01',
			characters: [],
			url: 'https://rickandmortyapi.com/api/episode/1',
			created: '2017-11-10T12:56:33.798Z'
		},
		{
			id: 2,
			name: 'Lawnmower Dog',
			air_date: 'December 9, 2013',
			episode: 'S01E02',
			characters: [],
			url: 'https://rickandmortyapi.com/api/episode/2',
			created: '2017-11-10T12:56:33.916Z'
		}
	];

	beforeEach(() => {
		jest.clearAllMocks();
		// Reset mock store
		mockStore.charactersSelected.FIRST = null;
		mockStore.charactersSelected.SECOND = null;
		mockStore.filteredEpisodes = {
			firstCharacterOnly: [],
			secondCharacterOnly: [],
			shared: []
		};
		mockStore.episodesLoading = false;
	});

	describe('title generation', () => {
		it('should generate correct title for FIRST position with character selected', () => {
			mockStore.charactersSelected.FIRST = mockCharacter1;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.title).toBe('Only Rick Episodes');
		});

		it('should generate correct title for SECOND position with character selected', () => {
			mockStore.charactersSelected.SECOND = mockCharacter2;

			const { result } = renderHook(() => useEpisodeSection('SECOND'));

			expect(result.current.title).toBe('Only Morty Episodes');
		});

		it('should generate correct title for BETWEEN position', () => {
			const { result } = renderHook(() => useEpisodeSection('BETWEEN'));

			expect(result.current.title).toBe('Shared Episodes');
		});

		it('should handle character with no name gracefully', () => {
			const characterWithoutName = { ...mockCharacter1, name: '' };
			mockStore.charactersSelected.FIRST = characterWithoutName;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.title).toBe('Only  Episodes');
		});

		it('should handle character with single word name', () => {
			const characterSingleName = { ...mockCharacter1, name: 'Rick' };
			mockStore.charactersSelected.FIRST = characterSingleName;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.title).toBe('Only Rick Episodes');
		});

		it('should handle character with multiple word name', () => {
			const characterMultiName = { ...mockCharacter1, name: 'Rick C-137 Sanchez' };
			mockStore.charactersSelected.FIRST = characterMultiName;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.title).toBe('Only Rick Episodes');
		});
	});

	describe('episode filtering', () => {
		it('should return firstCharacterOnly episodes for FIRST position', () => {
			mockStore.filteredEpisodes.firstCharacterOnly = [mockEpisodes[0]];

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.episodes).toEqual([mockEpisodes[0]]);
		});

		it('should return secondCharacterOnly episodes for SECOND position', () => {
			mockStore.filteredEpisodes.secondCharacterOnly = [mockEpisodes[1]];

			const { result } = renderHook(() => useEpisodeSection('SECOND'));

			expect(result.current.episodes).toEqual([mockEpisodes[1]]);
		});

		it('should return shared episodes for BETWEEN position', () => {
			mockStore.filteredEpisodes.shared = mockEpisodes;

			const { result } = renderHook(() => useEpisodeSection('BETWEEN'));

			expect(result.current.episodes).toEqual(mockEpisodes);
		});

		it('should return empty array when no episodes available', () => {
			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.episodes).toEqual([]);
		});

		it('should handle large episode lists correctly', () => {
			const manyEpisodes = Array.from({ length: 100 }, (_, i) => ({
				...mockEpisodes[0],
				id: i + 1,
				name: `Episode ${i + 1}`
			}));

			mockStore.filteredEpisodes.shared = manyEpisodes;

			const { result } = renderHook(() => useEpisodeSection('BETWEEN'));

			expect(result.current.episodes).toHaveLength(100);
			expect(result.current.episodes[0].name).toBe('Episode 1');
			expect(result.current.episodes[99].name).toBe('Episode 100');
		});
	});

	describe('character selection status', () => {
		it('should return true when FIRST character is selected', () => {
			mockStore.charactersSelected.FIRST = mockCharacter1;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.hasSelectedCharacters).toBe(true);
		});

		it('should return true when SECOND character is selected', () => {
			mockStore.charactersSelected.SECOND = mockCharacter2;

			const { result } = renderHook(() => useEpisodeSection('SECOND'));

			expect(result.current.hasSelectedCharacters).toBe(true);
		});

		it('should return true when both characters are selected', () => {
			mockStore.charactersSelected.FIRST = mockCharacter1;
			mockStore.charactersSelected.SECOND = mockCharacter2;

			const { result } = renderHook(() => useEpisodeSection('BETWEEN'));

			expect(result.current.hasSelectedCharacters).toBe(true);
		});

		it('should return false when no characters are selected', () => {
			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.hasSelectedCharacters).toBe(false);
		});

		it('should return true if only one character is selected (either position)', () => {
			mockStore.charactersSelected.FIRST = mockCharacter1;
			mockStore.charactersSelected.SECOND = null;

			const { result } = renderHook(() => useEpisodeSection('SECOND'));

			expect(result.current.hasSelectedCharacters).toBe(true);
		});
	});

	describe('loading state', () => {
		it('should return correct loading state when loading', () => {
			mockStore.episodesLoading = true;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.episodesLoading).toBe(true);
		});

		it('should return correct loading state when not loading', () => {
			mockStore.episodesLoading = false;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.episodesLoading).toBe(false);
		});
	});

	describe('edge cases', () => {
		it('should handle different positions correctly', () => {
			// Test each valid position to ensure they work
			['FIRST', 'SECOND', 'BETWEEN'].forEach((position) => {
				const { result } = renderHook(() => useEpisodeSection(position as any));

				expect(result.current.episodes).toEqual([]);
				expect(typeof result.current.title).toBe('string');
				expect(result.current.title.length).toBeGreaterThan(0);
			});
		});

		it('should update when store state changes', () => {
			const { result, rerender } = renderHook(() => useEpisodeSection('FIRST'));

			expect(result.current.episodes).toEqual([]);

			// Simulate store update
			mockStore.filteredEpisodes.firstCharacterOnly = [mockEpisodes[0]];

			rerender();

			expect(result.current.episodes).toEqual([mockEpisodes[0]]);
		});

		it('should handle character with undefined name', () => {
			const characterUndefinedName = { ...mockCharacter1, name: undefined as any };
			mockStore.charactersSelected.FIRST = characterUndefinedName;

			const { result } = renderHook(() => useEpisodeSection('FIRST'));

			// Should not crash and should handle gracefully
			expect(result.current.title).toContain('Episodes');
		});
	});
});
