import { describe, expect, test } from '@jest/globals';

import {
	LocalAPIManager
} from '@/index';

describe( 'LocalAPIManager', () => {

	const localAPIManager = new LocalAPIManager();

	describe( 'loadLockfile', () => {

		test( 'should return Lockfile', async () => {

			const result = await localAPIManager.loadLockfile();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'loadShooterGameLog', () => {

		test( 'should return ShooterGame Log', async () => {

			const result = await localAPIManager.loadShooterGameLog();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestLocalHelp', () => {

		test( 'should return Local Help', async () => {

			const result = await localAPIManager.requestLocalHelp();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestExternalSessions', () => {

		test( 'should return External Sessions', async () => {

			const result = await localAPIManager.requestExternalSessions();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestRSOUserInfo', () => {

		test( 'should return RSO User Info', async () => {

			const result = await localAPIManager.requestRSOUserInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestClientRegion', () => {

		test( 'should return Client Region', async () => {

			const result = await localAPIManager.requestClientRegion();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestAccountAlias', () => {

		test( 'should return Account Alias', async () => {

			const result = await localAPIManager.requestAccountAlias();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestEntitlementsToken', () => {

		test( 'should return Entitlements & Token', async () => {

			const result = await localAPIManager.requestEntitlementsToken();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestChatSession', () => {

		test( 'should return Chat Session', async () => {

			const result = await localAPIManager.requestChatSession();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestFriends', () => {

		test( 'should return Friends', async () => {

			const result = await localAPIManager.requestFriends();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestSendFriendRequest', () => {

		test.skip( 'should Send Friend Request', async () => {

			const result = await localAPIManager.requestSendFriendRequest( {
				"game_name": "",
				"game_tag": ""
			} );

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestRemoveFriendRequest', () => {

		test.skip( 'should Send Friend Request', async () => {

			const result = await localAPIManager.requestRemoveFriendRequest( {
				"puuid": "",
			} );

			expect( result ).toBe( '' );

		} );

	} );

	describe( 'requestPresence', () => {

		test( 'should return Presence', async () => {

			const result = await localAPIManager.requestPresence();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestFriendRequests', () => {

		test( 'should return Friend Requests', async () => {

			const result = await localAPIManager.requestFriendRequests();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestLocalSwaggerDocs', () => {

		test( 'should return Local Swagger Docs', async () => {

			const result = await localAPIManager.requestLocalSwaggerDocs();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestPartyChatInfo', () => {

		test( 'should return Party Chat Info', async () => {

			const result = await localAPIManager.requestPartyChatInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestPrePartyChatInfo', () => {

		test( 'should return Pre Party Chat Info', async () => {

			const result = await localAPIManager.requestPrePartyChatInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestCurrentGameChatInfo', () => {

		test( 'should return Current Game Chat Info', async () => {

			const result = await localAPIManager.requestCurrentGameChatInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestAllChatInfo', () => {

		test( 'should return All Chat Info', async () => {

			const result = await localAPIManager.requestAllChatInfo();

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestChatParticipants', () => {

		test.skip( 'should return Chat Participants', async () => {

			const result = await localAPIManager.requestChatParticipants( '' );

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestSendChat', () => {

		test.skip( 'should Send Chat', async () => {

			const result = await localAPIManager.requestSendChat( {
				'cid': '',
				'message': '',
				'type': 'chat',
			} );

			expect( typeof result ).toBe( 'object' );

		} );

	} );

	describe( 'requestChatHistory', () => {

		test.skip( 'should return Chat History', async () => {

			const result = await localAPIManager.requestChatHistory( '' );

			expect( typeof result ).toBe( 'object' );

		} );

	} );

} );
