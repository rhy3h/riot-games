import { describe, expect, test } from '@jest/globals';

import {
	loadLockfile,
	loadShooterGameLog,
	requestEntitlementsToken,
	requestFriends
} from '@/index';

describe( 'LocalAPIManager', () => {

	describe( 'loadLockfile', () => {

		test( 'should return Lockfile', async () => {

			const result = await loadLockfile();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'loadShooterGameLog', () => {

		test( 'should return ShooterGame Log', async () => {

			const result = await loadShooterGameLog();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestEntitlementsToken', () => {

		test( 'should return Entitlements & Token', async () => {

			const result = await requestEntitlementsToken();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestFriends', () => {

		test( 'should return Friends', async () => {

			const result = await requestFriends();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

} );
