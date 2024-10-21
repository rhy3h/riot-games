import { describe, expect, test } from '@jest/globals';

import {
	LocalCredentialManager,
	RiotAPIManager
} from '@/index';

describe( 'RiotAPIManager', () => {

	const credentialManager = new LocalCredentialManager();
	const riotAPIManager = new RiotAPIManager( credentialManager );

	describe( 'requestUserinfo', () => {

		test( 'should return User Info', async () => {

			const result = await riotAPIManager.requestUserinfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

} );
