import { describe, expect, test } from '@jest/globals';

import {
	LocalCredentialManager
} from '@/index';

describe( 'LocalCredentialManager', () => {

	const credentialManager = new LocalCredentialManager();

	describe( 'getEntitlement', () => {

		test( 'should return Entitlement', async () => {

			const result = await credentialManager.getEntitlement();

			expect( typeof result ).toBe( 'string' );

		} );

	} );

	describe( 'getToken', () => {

		test( 'should return Token', async () => {

			const result = await credentialManager.getToken();

			expect( typeof result ).toBe( 'string' );

		} );

	} );

} );
