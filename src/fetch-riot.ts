import fetch, { RequestInit } from 'node-fetch';

export async function fetchRiot( url: string, init?: RequestInit ) {

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
