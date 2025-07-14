import { useConnectionsStore } from '@/store/connections';
import { Character } from '@/repository/CharactersRepository';

export function useCharacterCard(character: Character, positionCharacter: 'FIRST' | 'SECOND') {
	const { setCharacterSelected, charactersSelected } = useConnectionsStore();

	const playClickSound = () => {
		try {
			const audio = new Audio('/sounds/selected-click.mp3');
			audio.volume = 0.5;
			audio.play().catch((error) => {
				console.warn('Error playing sound:', error);
			});
		} catch (error) {
			console.warn('Error creating audio:', error);
		}
	};

	const handleCharacterClick = () => {
		const otherPosition = positionCharacter === 'FIRST' ? 'SECOND' : 'FIRST';
		const otherCharacter = charactersSelected[otherPosition];

		if (otherCharacter && otherCharacter.id === character.id) {
			return;
		}

		playClickSound();
		setCharacterSelected({ character, position: positionCharacter });
	};

	return {
		handleCharacterClick
	};
}
