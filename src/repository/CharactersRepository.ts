import BaseHttpRepository from "./BaseHttpRepository";

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

export class CharactersRepository extends BaseHttpRepository {
  async getCharacters() {
    const response = await this.send<{
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: Character[];
    }>({
      method: 'get',
      path: '/character',
    })

    return response.data;
  }
}
