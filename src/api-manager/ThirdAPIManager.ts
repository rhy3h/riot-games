import fetch from 'node-fetch';

export async function requestValorantVersionFromThirdAPI(): Promise<ValorantVersion> {

	const url = 'https://valorant-api.com/v1/version';
	const result = await fetch( url )
		.then( ( response ) => {

			if ( response.status === 200 ) {

				return response.json();

			} else {

				throw Error( 'Unable to get valorant version from valorant-api.com' );

			}

		} )
		.then( ( response: any ) => {

			return response.data as ValorantVersion;

		} );

	return result;

}
