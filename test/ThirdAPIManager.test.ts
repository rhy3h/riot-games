import { describe, expect, test } from '@jest/globals';

import {
	requestValorantVersionFromThirdAPI
} from '@/index';

describe( 'ThirdAPIManager', () => {

	describe( 'requestValorantVersionFromThirdAPI', () => {

		test( 'should return Valorant Version', async () => {

			const result = await requestValorantVersionFromThirdAPI( );

			expect( typeof result ).toBe( 'object' );

		} );

	} );

} );
