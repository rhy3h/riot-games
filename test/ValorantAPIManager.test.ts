import { beforeAll, describe, expect, test } from '@jest/globals';

import {
	CurrentGamePlayerResponse,
	PregamePlayerResponse
} from 'valorant-api-types';

import {
	LocalCredentialManager,
	RiotAPIManager,
	ValorantAPIManager,
	ITEM_TYPE_AGENTS,
	ITEM_TYPE_CONTRACTS,
	ITEM_TYPE_SPRAYS,
	ITEM_TYPE_GUN_BUDDIES,
	ITEM_TYPE_CARDS,
	ITEM_TYPE_SKINS,
	ITEM_TYPE_SKIN_VARIANTS,
	ITEM_TYPE_SKIN_TITLES,
} from '@/index';

describe( 'ValorantAPIManager', () => {

	let uuid: string, partyId: string;

	const credentialManager = new LocalCredentialManager();
	const riotAPIManager = new RiotAPIManager( credentialManager );
	const valorantAPIManager = new ValorantAPIManager( credentialManager );

	beforeAll( async () => {

		const userInfo = await riotAPIManager.requestUserinfo();

		if ( userInfo && userInfo.sub ) {

			uuid = userInfo.sub;

		}

		const partyPlayer = await valorantAPIManager.requestPartyPlayer( 'ap', 'ap', uuid );
		if ( partyPlayer && partyPlayer.CurrentPartyID ) {

			partyId = partyPlayer.CurrentPartyID;

		}

	} );

	describe( 'PVP Endpoints', () => {

		describe( 'requestContent', () => {

			test( 'should return Content', async () => {

				const result = await valorantAPIManager.requestContent( 'ap' );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestAccountXP', () => {

			test( 'should return Account XP', async () => {

				const result = await valorantAPIManager.requestAccountXP( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPlayerLoadout', () => {

			test( 'should return Player Loadout', async () => {

				const result = await valorantAPIManager.requestPlayerLoadout( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPlayerMMR', () => {

			test( 'should return Player MMR', async () => {

				const result = await valorantAPIManager.requestPlayerMMR( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestMatchHistory', () => {

			test( 'should return Match History', async () => {

				const result = await valorantAPIManager.requestMatchHistory( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestMatchDetails', () => {

			test( 'should return Match Details', async () => {

				const matchHistory = await valorantAPIManager.requestMatchHistory( 'ap', uuid );
				const matchID = matchHistory.History[ 0 ][ 'MatchID' ];

				const result = await valorantAPIManager.requestMatchHistory( 'ap', matchID );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestCompetitiveUpdates', () => {

			test( 'should return Competitive Updates', async () => {

				const result = await valorantAPIManager.requestCompetitiveUpdates( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

	describe( 'Party Endpoints', () => {

		describe( 'requestParty', () => {

			test( 'should return Party', async () => {

				const result = await valorantAPIManager.requestParty( 'ap', 'ap', partyId );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPartyPlayer', () => {

			test( 'should return Party Player', async () => {

				const result = await valorantAPIManager.requestPartyPlayer( 'ap', 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestCustomGameConfigs', () => {

			test( 'should return Custom Game Configs', async () => {

				const result = await valorantAPIManager.requestCustomGameConfigs( 'ap', 'ap' );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPartyChatToken', () => {

			test( 'should return Party Chat Token', async () => {

				const result = await valorantAPIManager.requestPartyChatToken( 'ap', 'ap', partyId );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPartyVoiceToken', () => {

			test( 'should return Party Chat Token', async () => {

				const result = await valorantAPIManager.requestPartyVoiceToken( 'ap', 'ap', partyId );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

	describe( 'Store Endpoints', () => {

		describe( 'requestPrices', () => {

			test( 'should return Prices', async () => {

				const result = await valorantAPIManager.requestPrices( 'ap' );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestStorefront', () => {

			test( 'should return Storefront', async () => {

				const result = await valorantAPIManager.requestStorefront( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestWallet', () => {

			test( 'should return Wallet', async () => {

				const result = await valorantAPIManager.requestWallet( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestOwnedItems', () => {

			test( 'should return Agents', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_AGENTS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Contracts', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_CONTRACTS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Sprays', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_SPRAYS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Gun Buddies', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_GUN_BUDDIES );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Cards', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_CARDS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Skins', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_SKINS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Skin Variants', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_SKIN_VARIANTS );

				expect( typeof result ).toBe( 'object' );

			} );

			test( 'should return Titles', async () => {

				const result = await valorantAPIManager.requestOwnedItems( 'ap', uuid, ITEM_TYPE_SKIN_TITLES );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

	describe( 'Pre-Game Endpoints', () => {

		let preGamePlayer: PregamePlayerResponse;
		let preGameMatchID: string;

		beforeAll( async() => {

			preGamePlayer = await valorantAPIManager.requestPreGamePlayer( 'ap', 'ap', uuid );
			preGameMatchID = preGamePlayer.MatchID;

		} );

		describe( 'requestPreGamePlayer', () => {

			test( 'should return Pre-Game Player', async () => {

				const result = await valorantAPIManager.requestPreGamePlayer( 'ap', 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPreGameMatch', () => {

			test( 'should return Pre-Game Match', async () => {

				const result = await valorantAPIManager.requestPreGameMatch( 'ap', 'ap', preGameMatchID );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestPreGameLoadouts', () => {

			test( 'should return Pre-Game Loadouts', async () => {

				const result = await valorantAPIManager.requestPreGameLoadouts( 'ap', 'ap', preGameMatchID );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

	describe( 'Current Game Endpoints', () => {

		let currentGamePlayer: CurrentGamePlayerResponse;
		let currentGameMatchId: string;

		beforeAll( async() => {

			currentGamePlayer = await valorantAPIManager.requestCurrentGamePlayer( 'ap', 'ap', uuid );
			currentGameMatchId = currentGamePlayer.MatchID;

		} );

		describe( 'requestCurrentGamePlayer', () => {

			test( 'should return Current Game Player', async () => {

				const result = await valorantAPIManager.requestCurrentGamePlayer( 'ap', 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestCurrentGameMatch', () => {

			test( 'should return Current Game Match', async () => {

				const result = await valorantAPIManager.requestCurrentGameMatch( 'ap', 'ap', currentGameMatchId );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requestCurrentGameLoadouts', () => {

			test( 'should return Current Game Match', async () => {

				const result = await valorantAPIManager.requestCurrentGameLoadouts( 'ap', 'ap', currentGameMatchId );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

	describe( 'Contract Endpoints', () => {

		describe( 'requesItemUpgrades', () => {

			test( 'should return Item Upgrades', async () => {

				const result = await valorantAPIManager.requesItemUpgrades( 'ap' );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

		describe( 'requesItemContracts', () => {

			test( 'should return Item Contracts', async () => {

				const result = await valorantAPIManager.requesItemContracts( 'ap', uuid );

				expect( typeof result ).toBe( 'object' );

			} );

		} );

	} );

} );
