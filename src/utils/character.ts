import { EnumCharacterStatus } from "@/repository/CharactersRepository";

export const character = {
  getStatusColor: (status: EnumCharacterStatus) => {
		switch (status) {
			case 'Alive':
				return 'bg-green-700';
			case 'Dead':
				return 'bg-red-700';
			default:
				return 'bg-neutral-400';
		}
	}
}