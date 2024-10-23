import { describe, expect, test } from '@jest/globals';

import {
	loadLockfile,
	loadShooterGameLog,
	requestAccountAlias,
	requestChatSession,
	requestClientRegion,
	requestEntitlementsToken,
	requestExternalSessions,
	requestFriends,
	requestLocalHelp,
	requestLocalSwaggerDocs,
	requestPresence,
	requestRSOUserInfo
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

	describe( 'requestLocalHelp', () => {

		test( 'should return Local Help', async () => {

			const result = await requestLocalHelp();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestExternalSessions', () => {

		test( 'should return External Sessions', async () => {

			const result = await requestExternalSessions();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestRSOUserInfo', () => {

		test( 'should return RSO User Info', async () => {

			const result = await requestRSOUserInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestClientRegion', () => {

		test( 'should return Client Region', async () => {

			const result = await requestClientRegion();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestAccountAlias', () => {

		test( 'should return Account Alias', async () => {

			const result = await requestAccountAlias();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestEntitlementsToken', () => {

		test( 'should return Entitlements & Token', async () => {

			const result = await requestEntitlementsToken();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestChatSession', () => {

		test( 'should return Chat Session', async () => {

			const result = await requestChatSession();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestFriends', () => {

		test( 'should return Friends', async () => {

			const result = await requestFriends();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestPresence', () => {

		test( 'should return Presence', async () => {

			const result = await requestPresence();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestLocalSwaggerDocs', () => {

		test( 'should return Local Swagger Docs', async () => {

			const result = await requestLocalSwaggerDocs();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

} );
