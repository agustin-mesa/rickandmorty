import { useConnectionsStore } from '@/store/connections';
import { Character } from '@/repository/CharactersRepository';

export function useCharacterCard(character: Character, positionCharacter: 'FIRST' | 'SECOND') {
	const { setCharacterSelected } = useConnectionsStore();

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
		playClickSound();
		setCharacterSelected({ character, position: positionCharacter });
	};

	return {
		handleCharacterClick
	};
}
