import BaseHttpRepository from './BaseHttpRepository';

export enum EnumCharacterStatus {
	Alive = 'Alive',
	Dead = 'Dead',
	Unknown = 'unknown'
}

interface IOrigin {
	name: string;
	url: string;
}

interface ILocation {
	name: string;
	url: string;
}

export interface Character {
	id: number;
	name: string;
	status: EnumCharacterStatus;
	species: string;
	type: string;
	gender: string;
	origin: IOrigin;
	location: ILocation;
	image: string;
	episode: string[];
}

export interface CharacterFilters {
	name?: string;
	status?: EnumCharacterStatus;
	species?: string;
	type?: string;
	gender?: string;
}

export interface CharactersResponse {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Character[];
}

export class CharactersRepository extends BaseHttpRepository {
	async getCharacters(page: number = 1, filters?: CharacterFilters): Promise<CharactersResponse> {
		const params = new URLSearchParams();

		params.append('page', page.toString());

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) {
					params.append(key, value.toString());
				}
			});
		}

		const response = await this.send<CharactersResponse>({
			method: 'get',
			path: '/character',
			searchParams: params
		});

		return response.data;
	}

	async getCharacterById(id: number): Promise<Character> {
		const response = await this.send<Character>({
			method: 'get',
			path: `/character/${id}`
		});

		return response.data;
	}

	async getCharactersByIds(ids: number[]): Promise<Character[]> {
		const response = await this.send<Character[]>({
			method: 'get',
			path: `/character/${ids.join(',')}`
		});

		return response.data;
	}
}
