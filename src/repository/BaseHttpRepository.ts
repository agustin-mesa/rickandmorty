/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type Request =
	| {
			path: string;
			searchParams?: URLSearchParams;
			method?: 'get';
			headers?: Headers;
	  }
	| {
			path: string;
			searchParams?: URLSearchParams;
			method: 'post' | 'put' | 'patch' | 'delete';
			headers?: Headers;
			body?: any;
	  };

export class APIError {
	constructor(public readonly data: any) {}
}

class BaseHttpRepository {
	protected static readonly apiUrl = process.env.NEXT_PUBLIC_API_URL;
	public axiosInstance: AxiosInstance = axios.create();

	protected async send<R>(params: Request): Promise<AxiosResponse<R>> {
		const method = params.method || 'get';
		const url = this.buildUrl(params).toString();
		const headers = this.buildHeaders(params);
		const body = this.buildBody(params);

		try {
			if (body instanceof FormData) {
				headers.delete('Content-Type');
			}

			const response = await this.axiosInstance.request({
				method,
				url,
				headers: Object.fromEntries(headers.entries()),
				data: body
			});

			if (response.status >= 300) {
				throw new APIError(response.data);
			}

			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new APIError(error.response?.data);
			}

			throw error;
		}
	}

	private buildUrl(params: Request): URL {
		const url = new URL(BaseHttpRepository.apiUrl + params.path);

		if (params.searchParams) {
			params.searchParams.forEach((value, key) => url.searchParams.set(key, value));
		}

		return url;
	}

	private buildHeaders(params: Request): Headers {
		const headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('timezone-offset', new Date().getTimezoneOffset().toString());

		if (params.headers) {
			params.headers.forEach((value, key) => headers.append(key, value));
		}

		return headers;
	}

	private buildBody(params: Request): BodyInit | undefined {
		if (params.method === undefined || params.method === 'get' || !('body' in params)) {
			return undefined;
		}

		if (params.headers?.get('Content-Type') !== 'application/json') {
			return params.body;
		}

		return params.body !== undefined ? JSON.parse(params.body) : undefined;
	}

	protected objectToURLParams(data: { [k: string]: unknown }) {
		return new URLSearchParams(
			Object.fromEntries(
				Object.entries(data)
					.filter(([, v]) => v !== undefined)
					.map(([k, v]) => [k, `${v}`])
			)
		);
	}
}

export default BaseHttpRepository;
