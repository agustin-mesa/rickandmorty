import BaseHttpRepository from './BaseHttpRepository';

export enum EnumCharacterStatus {
	Alive = 'Alive',
	Dead = 'Dead',
	Unknown = 'unknown'
}

export enum EnumCharacterGender {
	Female = 'Female',
	Male = 'Male',
	Genderless = 'Genderless',
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
	gender?: EnumCharacterGender;
	page?: number;
	[k: string]: unknown;
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
	async getCharacters(params: CharacterFilters = {}): Promise<CharactersResponse> {
		const response = await this.send<CharactersResponse>({
			method: 'get',
			path: '/character',
			searchParams: this.objectToURLParams(params)
		});

		return response.data;
	}
}
