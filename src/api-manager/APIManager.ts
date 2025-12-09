import fetch, { type RequestInit } from 'node-fetch';

class APIManager {

	constructor( ) {}

	protected async fetchRiot<T>( url: string, init?: RequestInit ): Promise<T> {

		const response = await fetch( url, init );

		if ( response.status === 200 ) {

			return await response.json() as T;

		}

		if ( response.status === 204 ) {

			return null;

		}

		throw new Error( `Response ${response.status}: ${response.statusText}` );

	}

}

export { APIManager };
