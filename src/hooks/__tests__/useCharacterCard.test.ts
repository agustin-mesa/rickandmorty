import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useCharacterCard } from '../useCharacterCard';
import { Character, EnumCharacterStatus } from '@/repository/CharactersRepository';

// Mock store
const mockSetCharacterSelected = jest.fn();
const mockCharactersSelected: { FIRST: Character | null; SECOND: Character | null } = {
	FIRST: null,
	SECOND: null
};

jest.mock('@/store/connections', () => ({
	useConnectionsStore: jest.fn(() => ({
		setCharacterSelected: mockSetCharacterSelected,
		charactersSelected: mockCharactersSelected
	}))
}));

// Mock Audio API
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockAudio = jest.fn().mockImplementation(() => ({
	play: mockPlay,
	volume: 0.5
}));

Object.defineProperty(window, 'Audio', {
	writable: true,
	value: mockAudio
});

describe('useCharacterCard', () => {
	const mockCharacter: Character = {
		id: 1,
		name: 'Rick Sanchez',
		status: EnumCharacterStatus.Alive,
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
		location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		episode: ['https://rickandmortyapi.com/api/episode/1']
	};

	const mockCharacter2: Character = {
		...mockCharacter,
		id: 2,
		name: 'Morty Smith',
		image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
	};

	beforeEach(() => {
		jest.clearAllMocks();
		mockCharactersSelected.FIRST = null;
		mockCharactersSelected.SECOND = null;
	});

	describe('handleCharacterClick', () => {
		it('should call setCharacterSelected with correct parameters for FIRST position', () => {
			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).toHaveBeenCalledWith({
				character: mockCharacter,
				position: 'FIRST'
			});
		});

		it('should call setCharacterSelected with correct parameters for SECOND position', () => {
			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'SECOND'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).toHaveBeenCalledWith({
				character: mockCharacter,
				position: 'SECOND'
			});
		});

		it('should play sound when character is clicked', () => {
			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockAudio).toHaveBeenCalledWith('/sounds/selected-click.mp3');
			expect(mockPlay).toHaveBeenCalled();
		});

		it('should not select character if same character is already selected in other position', () => {
			// Mock that character is already selected in SECOND position
			mockCharactersSelected.SECOND = mockCharacter;

			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			// Should not call setCharacterSelected because same character is in other position
			expect(mockSetCharacterSelected).not.toHaveBeenCalled();
			expect(mockPlay).not.toHaveBeenCalled();
		});

		it('should allow selecting same character if not in other position', () => {
			// Mock that a different character is selected in SECOND position
			mockCharactersSelected.SECOND = mockCharacter2;

			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).toHaveBeenCalledWith({
				character: mockCharacter,
				position: 'FIRST'
			});
		});

		it('should handle audio creation errors gracefully', () => {
			const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
			mockAudio.mockImplementationOnce(() => {
				throw new Error('Audio creation failed');
			});

			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(consoleWarnSpy).toHaveBeenCalledWith('Error creating audio:', expect.any(Error));
			expect(mockSetCharacterSelected).toHaveBeenCalled(); // Should still select character

			consoleWarnSpy.mockRestore();
		});

		it('should handle audio play errors gracefully', () => {
			const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
			mockPlay.mockRejectedValueOnce(new Error('Audio play failed'));

			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).toHaveBeenCalled(); // Should still select character

			// Wait for async operation
			setTimeout(() => {
				expect(consoleWarnSpy).toHaveBeenCalledWith(
					'Error playing sound:',
					expect.any(Error)
				);
				consoleWarnSpy.mockRestore();
			}, 0);
		});

		it('should set correct audio volume', () => {
			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));
			const mockAudioInstance = { play: mockPlay, volume: 0 };
			mockAudio.mockReturnValueOnce(mockAudioInstance);

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockAudioInstance.volume).toBe(0.5);
		});

		it('should work with different character data', () => {
			const specialCharacter: Character = {
				...mockCharacter,
				id: 999,
				name: 'Special Character',
				status: EnumCharacterStatus.Dead,
				species: 'Alien'
			};

			const { result } = renderHook(() => useCharacterCard(specialCharacter, 'SECOND'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).toHaveBeenCalledWith({
				character: specialCharacter,
				position: 'SECOND'
			});
		});

		it('should handle rapid clicks correctly', () => {
			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			// Simulate rapid clicks
			act(() => {
				result.current.handleCharacterClick();
				result.current.handleCharacterClick();
				result.current.handleCharacterClick();
			});

			// Should call setCharacterSelected for each click
			expect(mockSetCharacterSelected).toHaveBeenCalledTimes(3);
			expect(mockPlay).toHaveBeenCalledTimes(3);
		});

		it('should prevent selection if same character ID in opposite position', () => {
			// Character with same ID but different object reference
			const duplicateCharacter = { ...mockCharacter };
			mockCharactersSelected.SECOND = duplicateCharacter;

			const { result } = renderHook(() => useCharacterCard(mockCharacter, 'FIRST'));

			act(() => {
				result.current.handleCharacterClick();
			});

			expect(mockSetCharacterSelected).not.toHaveBeenCalled();
		});
	});
});
