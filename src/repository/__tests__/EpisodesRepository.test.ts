/* eslint-disable @typescript-eslint/no-explicit-any */

import { EpisodesRepository, Episode } from '@/repository/EpisodesRepository';
import BaseHttpRepository from '@/repository/BaseHttpRepository';

// Mock BaseHttpRepository
jest.mock('../BaseHttpRepository');

describe('EpisodesRepository', () => {
	let episodesRepository: EpisodesRepository;
	let mockSend: jest.Mock;

	beforeEach(() => {
		mockSend = jest.fn();

		// Create a proper mock instance
		const mockInstance = {
			send: mockSend,
			getEpisodesByIds: EpisodesRepository.prototype.getEpisodesByIds,
			extractIdFromUrl: EpisodesRepository.prototype.extractIdFromUrl,
			extractIdsFromUrls: EpisodesRepository.prototype.extractIdsFromUrls
		};

		(BaseHttpRepository as jest.MockedClass<typeof BaseHttpRepository>).mockImplementation(
			() => mockInstance as any
		);

		episodesRepository = new EpisodesRepository();
		jest.clearAllMocks();
	});

	describe('getEpisodesByIds', () => {
		const mockEpisodes: Episode[] = [
			{
				id: 1,
				name: 'Pilot',
				air_date: 'December 2, 2013',
				episode: 'S01E01',
				characters: ['character1', 'character2'],
				url: 'https://rickandmortyapi.com/api/episode/1',
				created: '2017-11-10T12:56:33.798Z'
			},
			{
				id: 2,
				name: 'Lawnmower Dog',
				air_date: 'December 9, 2013',
				episode: 'S01E02',
				characters: ['character1', 'character2'],
				url: 'https://rickandmortyapi.com/api/episode/2',
				created: '2017-11-10T12:56:33.916Z'
			}
		];

		it('should return empty array when no ids provided', async () => {
			const result = await episodesRepository.getEpisodesByIds({ ids: [] });

			expect(result).toEqual([]);
			expect(mockSend).not.toHaveBeenCalled();
		});

		it('should fetch single episode correctly', async () => {
			const singleEpisode = mockEpisodes[0];
			mockSend.mockResolvedValue({ data: singleEpisode });

			const result = await episodesRepository.getEpisodesByIds({ ids: [1] });

			expect(mockSend).toHaveBeenCalledWith({
				method: 'get',
				path: '/episode/1'
			});
			expect(result).toEqual([singleEpisode]);
		});

		it('should fetch multiple episodes correctly', async () => {
			mockSend.mockResolvedValue({ data: mockEpisodes });

			const result = await episodesRepository.getEpisodesByIds({ ids: [1, 2] });

			expect(mockSend).toHaveBeenCalledWith({
				method: 'get',
				path: '/episode/1,2'
			});
			expect(result).toEqual(mockEpisodes);
		});

		it('should handle API response with single episode as object', async () => {
			const singleEpisode = mockEpisodes[0];
			mockSend.mockResolvedValue({ data: singleEpisode });

			const result = await episodesRepository.getEpisodesByIds({ ids: [1] });

			expect(result).toEqual([singleEpisode]);
		});

		it('should handle API response with multiple episodes as array', async () => {
			mockSend.mockResolvedValue({ data: mockEpisodes });

			const result = await episodesRepository.getEpisodesByIds({ ids: [1, 2] });

			expect(result).toEqual(mockEpisodes);
		});

		it('should handle many episode IDs correctly', async () => {
			const manyIds = Array.from({ length: 10 }, (_, i) => i + 1);
			mockSend.mockResolvedValue({ data: mockEpisodes });

			await episodesRepository.getEpisodesByIds({ ids: manyIds });

			expect(mockSend).toHaveBeenCalledWith({
				method: 'get',
				path: '/episode/1,2,3,4,5,6,7,8,9,10'
			});
		});

		it('should propagate API errors', async () => {
			const apiError = new Error('API Error');
			mockSend.mockRejectedValue(apiError);

			await expect(episodesRepository.getEpisodesByIds({ ids: [1] })).rejects.toThrow(
				'API Error'
			);
		});
	});

	describe('extractIdFromUrl', () => {
		it('should extract ID from valid episode URL', () => {
			const url = 'https://rickandmortyapi.com/api/episode/42';
			const result = episodesRepository.extractIdFromUrl(url);

			expect(result).toBe(42);
		});

		it('should extract ID from episode URL with different domain', () => {
			const url = 'https://example.com/api/episode/123';
			const result = episodesRepository.extractIdFromUrl(url);

			expect(result).toBe(123);
		});

		it('should return 0 for invalid URL format', () => {
			const invalidUrls = [
				'https://rickandmortyapi.com/api/character/1',
				'https://rickandmortyapi.com/api/episode/',
				'https://rickandmortyapi.com/api/episode/abc',
				'not-a-url',
				'',
				'https://rickandmortyapi.com/api/episode/1/details'
			];

			invalidUrls.forEach((url) => {
				const result = episodesRepository.extractIdFromUrl(url);
				expect(result).toBe(0);
			});
		});

		it('should handle URLs with trailing slashes', () => {
			const url = 'https://rickandmortyapi.com/api/episode/15/';
			const result = episodesRepository.extractIdFromUrl(url);

			expect(result).toBe(0); // Should fail because of trailing slash
		});

		it('should handle very large episode IDs', () => {
			const url = 'https://rickandmortyapi.com/api/episode/999999';
			const result = episodesRepository.extractIdFromUrl(url);

			expect(result).toBe(999999);
		});
	});

	describe('extractIdsFromUrls', () => {
		it('should extract multiple IDs from valid URLs', () => {
			const urls = [
				'https://rickandmortyapi.com/api/episode/1',
				'https://rickandmortyapi.com/api/episode/2',
				'https://rickandmortyapi.com/api/episode/3'
			];

			const result = episodesRepository.extractIdsFromUrls(urls);

			expect(result).toEqual([1, 2, 3]);
		});

		it('should filter out invalid URLs and keep valid ones', () => {
			const urls = [
				'https://rickandmortyapi.com/api/episode/1',
				'invalid-url',
				'https://rickandmortyapi.com/api/episode/2',
				'https://rickandmortyapi.com/api/character/1', // wrong endpoint
				'https://rickandmortyapi.com/api/episode/3'
			];

			const result = episodesRepository.extractIdsFromUrls(urls);

			expect(result).toEqual([1, 2, 3]);
		});

		it('should return empty array for empty input', () => {
			const result = episodesRepository.extractIdsFromUrls([]);

			expect(result).toEqual([]);
		});

		it('should return empty array when all URLs are invalid', () => {
			const urls = [
				'invalid-url',
				'https://rickandmortyapi.com/api/character/1',
				'not-a-url-at-all',
				''
			];

			const result = episodesRepository.extractIdsFromUrls(urls);

			expect(result).toEqual([]);
		});

		it('should handle duplicate IDs correctly', () => {
			const urls = [
				'https://rickandmortyapi.com/api/episode/1',
				'https://rickandmortyapi.com/api/episode/2',
				'https://rickandmortyapi.com/api/episode/1', // duplicate
				'https://rickandmortyapi.com/api/episode/3'
			];

			const result = episodesRepository.extractIdsFromUrls(urls);

			// Should include duplicates (filter happens elsewhere)
			expect(result).toEqual([1, 2, 1, 3]);
		});

		it('should handle mixed valid and invalid URLs in large array', () => {
			const urls = Array.from({ length: 100 }, (_, i) => {
				if (i % 3 === 0) return 'invalid-url';
				return `https://rickandmortyapi.com/api/episode/${i + 1}`;
			});

			const result = episodesRepository.extractIdsFromUrls(urls);

			// Should have ~66 valid IDs (excluding every 3rd one which is invalid)
			expect(result.length).toBe(66);
			expect(result).not.toContain(0);
			expect(result.every((id) => id > 0)).toBe(true);
		});
	});
});
