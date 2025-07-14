  import { Character } from '@/repository/CharactersRepository';
import { create } from 'zustand';

export interface ConnectionsStore {
  charactersSelected: Record<string, Character | null>;
	setCharacterSelected: (params: {
    character: Character;
    position: 'FIRST' | 'SECOND';
  }) => void;
}

export const useConnectionsStore = create<ConnectionsStore>((set, get) => ({
	charactersSelected: {
		FIRST: null,
		SECOND: null,
	},
	setCharacterSelected: (params) =>
		set({
			charactersSelected: {
				...get().charactersSelected,
				[params.position]: params.character,
			},
		}),
}));