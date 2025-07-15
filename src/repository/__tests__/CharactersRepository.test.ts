/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	CharactersRepository,
	CharactersResponse,
	EnumCharacterStatus
} from '@/repository/CharactersRepository';
import BaseHttpRepository from '@/repository/BaseHttpRepository';

// Mock BaseHttpRepository
jest.mock('../BaseHttpRepository');

describe('CharactersRepository', () => {
	let charactersRepository: CharactersRepository;
	let mockSend: jest.Mock;
	let mockObjectToURLParams: jest.Mock;

	beforeEach(() => {
		mockSend = jest.fn();
		mockObjectToURLParams = jest.fn();

		// Create a proper mock instance
		const mockInstance = {
			send: mockSend,
			objectToURLParams: mockObjectToURLParams,
			getCharacters: CharactersRepository.prototype.getCharacters
		};

		(BaseHttpRepository as jest.MockedClass<typeof BaseHttpRepository>).mockImplementation(
			() => mockInstance as any
		);

		charactersRepository = new CharactersRepository();
		jest.clearAllMocks();
	});

	describe('getCharacters', () => {
		const mockCharactersResponse: CharactersResponse = {
			info: {
				count: 826,
				pages: 42,
				next: 'https://rickandmortyapi.com/api/character?page=2',
				prev: null
			},
			results: [
				{
					id: 1,
					name: 'Rick Sanchez',
					status: EnumCharacterStatus.Alive,
					species: 'Human',
					type: '',
					gender: 'Male',
					origin: {
						name: 'Earth (C-137)',
						url: 'https://rickandmortyapi.com/api/location/1'
					},
					location: {
						name: 'Citadel of Ricks',
						url: 'https://rickandmortyapi.com/api/location/3'
					},
					image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
					episode: [
						'https://rickandmortyapi.com/api/episode/1',
						'https://rickandmortyapi.com/api/episode/2'
					]
				},
				{
					id: 2,
					name: 'Morty Smith',
					status: EnumCharacterStatus.Alive,
					species: 'Human',
					type: '',
					gender: 'Male',
					origin: {
						name: 'unknown',
						url: ''
					},
					location: {
						name: 'Citadel of Ricks',
						url: 'https://rickandmortyapi.com/api/location/3'
					},
					image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
					episode: [
						'https://rickandmortyapi.com/api/episode/1',
						'https://rickandmortyapi.com/api/episode/2'
					]
				}
			]
		};

		it('should fetch characters with default parameters', async () => {
			const mockURLParams = new URLSearchParams();
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			const result = await charactersRepository.getCharacters({});

			expect(mockObjectToURLParams).toHaveBeenCalledWith({});
			expect(mockSend).toHaveBeenCalledWith({
				method: 'get',
				path: '/character',
				searchParams: mockURLParams
			});
			expect(result).toEqual(mockCharactersResponse);
		});

		it('should fetch characters with page parameter', async () => {
			const mockURLParams = new URLSearchParams('page=2');
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			const result = await charactersRepository.getCharacters({ page: 2 });

			expect(mockObjectToURLParams).toHaveBeenCalledWith({ page: 2 });
			expect(mockSend).toHaveBeenCalledWith({
				method: 'get',
				path: '/character',
				searchParams: mockURLParams
			});
			expect(result).toEqual(mockCharactersResponse);
		});

		it('should handle first page correctly', async () => {
			const mockURLParams = new URLSearchParams('page=1');
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			await charactersRepository.getCharacters({ page: 1 });

			expect(mockObjectToURLParams).toHaveBeenCalledWith({ page: 1 });
		});

		it('should handle large page numbers', async () => {
			const mockURLParams = new URLSearchParams('page=42');
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			await charactersRepository.getCharacters({ page: 42 });

			expect(mockObjectToURLParams).toHaveBeenCalledWith({ page: 42 });
		});

		it('should handle API response with empty results', async () => {
			const emptyResponse: CharactersResponse = {
				info: {
					count: 0,
					pages: 0,
					next: null,
					prev: null
				},
				results: []
			};

			const mockURLParams = new URLSearchParams();
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: emptyResponse });

			const result = await charactersRepository.getCharacters({});

			expect(result).toEqual(emptyResponse);
			expect(result.results).toHaveLength(0);
		});

		it('should handle API response with pagination info', async () => {
			const paginatedResponse: CharactersResponse = {
				info: {
					count: 826,
					pages: 42,
					next: 'https://rickandmortyapi.com/api/character?page=3',
					prev: 'https://rickandmortyapi.com/api/character?page=1'
				},
				results: mockCharactersResponse.results
			};

			const mockURLParams = new URLSearchParams('page=2');
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: paginatedResponse });

			const result = await charactersRepository.getCharacters({ page: 2 });

			expect(result.info.next).toBe('https://rickandmortyapi.com/api/character?page=3');
			expect(result.info.prev).toBe('https://rickandmortyapi.com/api/character?page=1');
			expect(result.info.pages).toBe(42);
			expect(result.info.count).toBe(826);
		});

		it('should handle different character statuses', async () => {
			const charactersWithDifferentStatuses: CharactersResponse = {
				...mockCharactersResponse,
				results: [
					{ ...mockCharactersResponse.results[0], status: EnumCharacterStatus.Alive },
					{ ...mockCharactersResponse.results[1], status: EnumCharacterStatus.Dead },
					{
						...mockCharactersResponse.results[0],
						id: 3,
						status: EnumCharacterStatus.Unknown
					}
				]
			};

			const mockURLParams = new URLSearchParams();
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: charactersWithDifferentStatuses });

			const result = await charactersRepository.getCharacters({});

			expect(result.results[0].status).toBe(EnumCharacterStatus.Alive);
			expect(result.results[1].status).toBe(EnumCharacterStatus.Dead);
			expect(result.results[2].status).toBe(EnumCharacterStatus.Unknown);
		});

		it('should propagate API errors', async () => {
			const apiError = new Error('Network Error');
			mockSend.mockRejectedValue(apiError);

			await expect(charactersRepository.getCharacters({ page: 1 })).rejects.toThrow(
				'Network Error'
			);
		});

		it('should handle 404 errors gracefully', async () => {
			const notFoundError = new Error('Page not found');
			mockSend.mockRejectedValue(notFoundError);

			await expect(charactersRepository.getCharacters({ page: 999 })).rejects.toThrow(
				'Page not found'
			);
		});

		it('should handle undefined page parameter', async () => {
			const mockURLParams = new URLSearchParams();
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			await charactersRepository.getCharacters({ page: undefined });

			expect(mockObjectToURLParams).toHaveBeenCalledWith({ page: undefined });
		});

		it('should return character with all required properties', async () => {
			const mockURLParams = new URLSearchParams();
			mockObjectToURLParams.mockReturnValue(mockURLParams);
			mockSend.mockResolvedValue({ data: mockCharactersResponse });

			const result = await charactersRepository.getCharacters({});
			const character = result.results[0];

			// Verify all required character properties are present
			expect(character).toHaveProperty('id');
			expect(character).toHaveProperty('name');
			expect(character).toHaveProperty('status');
			expect(character).toHaveProperty('species');
			expect(character).toHaveProperty('type');
			expect(character).toHaveProperty('gender');
			expect(character).toHaveProperty('origin');
			expect(character).toHaveProperty('location');
			expect(character).toHaveProperty('image');
			expect(character).toHaveProperty('episode');

			// Verify nested objects have required properties
			expect(character.origin).toHaveProperty('name');
			expect(character.origin).toHaveProperty('url');
			expect(character.location).toHaveProperty('name');
			expect(character.location).toHaveProperty('url');

			// Verify types
			expect(typeof character.id).toBe('number');
			expect(typeof character.name).toBe('string');
			expect(Array.isArray(character.episode)).toBe(true);
		});
	});
});
