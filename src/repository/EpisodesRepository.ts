import BaseHttpRepository from './BaseHttpRepository';

export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}

export interface EpisodeFilters {
	name?: string;
	episode?: string;
}

export interface EpisodesResponse {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Episode[];
}

export class EpisodesRepository extends BaseHttpRepository {
	async getEpisodes(page: number = 1, filters?: EpisodeFilters): Promise<EpisodesResponse> {
		const params = new URLSearchParams();

		params.append('page', page.toString());

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) {
					params.append(key, value.toString());
				}
			});
		}

		const response = await this.send<EpisodesResponse>({
			method: 'get',
			path: '/episode',
			searchParams: params
		});

		return response.data;
	}

	async getEpisodeById(id: number): Promise<Episode> {
		const response = await this.send<Episode>({
			method: 'get',
			path: `/episode/${id}`
		});

		return response.data;
	}

	async getEpisodesByIds(ids: number[]): Promise<Episode[]> {
		if (ids.length === 0) return [];

		const response = await this.send<Episode[]>({
			method: 'get',
			path: `/episode/${ids.join(',')}`
		});

		return Array.isArray(response.data) ? response.data : [response.data];
	}

	extractIdFromUrl(url: string): number {
		const match = url.match(/\/episode\/(\d+)$/);
		return match ? parseInt(match[1], 10) : 0;
	}

	extractIdsFromUrls(urls: string[]): number[] {
		return urls.map((url) => this.extractIdFromUrl(url)).filter((id) => id > 0);
	}
}
