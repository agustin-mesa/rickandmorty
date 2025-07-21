import { useConnectionsStore } from '@/store/connections';
import { Character } from '@/repository/CharactersRepository';

/**
 * The `useCharacterCard` function in TypeScript handles character card clicks, plays a click sound,
 * and updates the selected character in a store based on the position.
 * @param {Character} character - The `character` parameter in the `useCharacterCard` function
 * represents a character object that contains information about a specific character, such as their
 * name, image, abilities, etc. This object is used to display information about the character in a
 * character card component.
 * @param {'FIRST' | 'SECOND'} positionCharacter - The `positionCharacter` parameter in the
 * `useCharacterCard` function is a string literal type that can only have the values `'FIRST'` or
 * `'SECOND'`. This parameter is used to determine the position of the character card within the
 * selection (either first or second).
 * @returns The `useCharacterCard` function returns an object with a single property
 * `handleCharacterClick`, which is a function that handles the click event on a character card.
 */
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
