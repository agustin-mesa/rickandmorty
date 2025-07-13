import BaseHttpRepository from "./BaseHttpRepository";

  export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
  }

export class EpisodesRepository extends BaseHttpRepository {
  async getEpisodes() {
    const response = await this.send<{
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: Episode[];
    }>({
      method: 'get',
      path: '/episode',
    })

    return response.data;
  }
}
