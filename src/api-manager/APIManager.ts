import fetch, { type RequestInit } from 'node-fetch';

class APIManager {

	constructor( ) {}

	protected async fetch( url: string, init?: RequestInit ) {

		return fetch( url, init )
			.then( ( response ) => {

				if ( response.status === 200 ) {

					return response.json();

				} else if ( response.status === 204 ) {

					return "";

				} else {

					throw Error( 'Response ' + response.status + ': ' + response.statusText );

				}

			} );

	}

}

export { APIManager };
