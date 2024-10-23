import type { RequestInit } from 'node-fetch';

import { fetchRiot } from '@/fetch-riot';

import { CLIENT_PLATFORM } from '@/constants';

import { Shard, Region, ItemType } from '@/api-manager/ValorantAPIType';

import { loadShooterGameLog } from '@/api-manager/LocalAPIManager';
import { LocalCredentialManager } from '@/credential-manager/LocalCredentialManager';
import { requestValorantVersionFromThirdAPI } from '@/api-manager/ThirdAPIManager';

import type {
	AccountXPResponse,
	ActivateContractResponse,
	CompetitiveUpdatesResponse,
	CurrentGameLoadoutsResponse,
	CurrentGameMatchResponse,
	CurrentGamePlayerResponse,
	CustomGameConfigsResponse,
	FetchContentResponse,
	ItemUpgradesResponse,
	MatchDetailsResponse,
	MatchHistoryResponse,
	OwnedItemsResponse,
	PartyChatTokenResponse,
	PartyPlayerResponse,
	PartyResponse,
	PartyVoiceTokenResponse,
	PlayerLoadoutResponse,
	PlayerMMRResponse,
	PregameLoadoutsResponse,
	PregamePlayerResponse,
	PricesResponse,
	StorefrontResponse,
	WalletResponse
} from 'valorant-api-types';

class ValorantAPIManager {

	private readonly _credentialManager: LocalCredentialManager;

	private _ciServerVersion: string | null = null;

	constructor( credentialManager: LocalCredentialManager ) {

		this._credentialManager = credentialManager;

	}

	private async requestRemotePD( shard: Shard, resource: string, init?: RequestInit ) {

		const url = `https://pd.${ shard }.a.pvp.net/${ resource }`;

		const result = await fetchRiot( url, init );

		return result;

	}

	private async requestRemoteShared( shard: Shard, resource: string, init?: RequestInit ) {

		const url = `https://shared.${ shard }.a.pvp.net/${ resource }`;

		const result = await fetchRiot( url, init );

		return result;

	}

	private async requestRemoteGLZ( region: Region, shard: Shard, resource: string, init?: RequestInit ) {

		const url = `https://glz-${ region }-1.${ shard }.a.pvp.net/${ resource }`;

		const result = await fetchRiot( url, init );

		return result;

	}

	private async requestCIServerVersion() {

		if ( this._ciServerVersion ) {

			return;

		}

		const {
			branch,
			buildVersion,
			changelist
		} = await loadShooterGameLog();

		if ( branch !== undefined && buildVersion !== undefined && changelist !== undefined ) {

			this._ciServerVersion = [ branch, 'shipping', buildVersion, changelist ].join( '-' );

			return;

		}

		const valorantVersion = await requestValorantVersionFromThirdAPI();
		if ( valorantVersion && valorantVersion.riotClientVersion ) {

			this._ciServerVersion = valorantVersion.riotClientVersion;

			return;

		}

	}

	private async getCIServerVersion() {

		await this.requestCIServerVersion();

		return this._ciServerVersion;

	}

	private async getAuthHeader() {

		const headers = {
			'Authorization': 'Bearer ' + await this._credentialManager.getToken(),
			'X-Riot-Entitlements-JWT': await this._credentialManager.getEntitlement(),
		};

		return headers;

	}

	private async getAuthClientHeader() {

		const headers = await this.getAuthHeader();

		return {
			...headers,
			'X-Riot-ClientPlatform': CLIENT_PLATFORM,
			'X-Riot-ClientVersion': await this.getCIServerVersion(),
		};

	}

	// ===================
	// PVP Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/fetch-content)
	 */
	public async requestContent( shard: Shard ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteShared( shard, `content-service/v3/content`, init ) as Promise<FetchContentResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/account-xp)
	 */
	public async requestAccountXP( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `account-xp/v1/players/${ uuid }`, init ) as Promise<AccountXPResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/player-loadout)
	 */
	public async requestPlayerLoadout( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `personalization/v2/players/${ uuid }/playerloadout`, init ) as Promise<PlayerLoadoutResponse>;

	}

	// TODO: feat. [PUT] Player Loadout
	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/player-loadout)
	 */

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/player-mmr)
	 */
	public async requestPlayerMMR( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `mmr/v1/players/${ uuid }`, init ) as Promise<PlayerMMRResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/match-history)
	 */
	public async requestMatchHistory( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		// TODO: feat. Support query params

		return this.requestRemotePD( shard, `match-history/v1/history/${ uuid }`, init ) as Promise<MatchHistoryResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/match-details)
	 */
	public async requestMatchDetails( shard: Shard, matchID: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `match-details/v1/matches/${ matchID }`, init ) as Promise<MatchDetailsResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/competitive-updates)
	 */
	public async requestCompetitiveUpdates( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		// TODO: feat. Support query params

		return this.requestRemotePD( shard, `mmr/v1/players/${ uuid }/competitiveupdates`, init ) as Promise<CompetitiveUpdatesResponse>;

	}

	// TODO: feat. [GET] Leaderboard

	// TODO: feat. [GET] Penalties

	// TODO: feat. [GET] Config

	// TODO: feat. [PUT] Name Service

	// PVP Endpoints End
	// =================

	// =====================
	// Party Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party)
	 */
	public async requestParty( region: Region, shard: Shard, partyId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `parties/v1/parties/${ partyId }`, init ) as Promise<PartyResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party-player)
	 */
	public async requestPartyPlayer( region: Region, shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `parties/v1/players/${ uuid }`, init ) as Promise<PartyPlayerResponse>;

	}

	// TODO: feat. [DELETE] Party Remove Player

	// TODO: feat. [POST] Refresh Player Identity

	// TODO: feat. [POST] Refresh Pings

	// TODO: feat. [POST] Change Queue

	// TODO: feat. [POST] Enter Matchmaking Queue

	// TODO: feat. [POST] Leave Matchmaking Queue

	// TODO: feat. [POST] Set Party Accessibility

	// TODO: feat. [POST] Set Custom Game Settings

	// TODO: feat. [POST] Party Invite

	// TODO: feat. [POST] Party Request

	// TODO: feat. [POST] Party Decline

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/custom-game-configs)
	 */
	public async requestCustomGameConfigs( region: Region, shard: Shard ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `parties/v1/parties/customgameconfigs`, init ) as Promise<CustomGameConfigsResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party-chat-token)
	 */
	public async requestPartyChatToken( region: Region, shard: Shard, partyId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `parties/v1/parties/${ partyId }/muctoken`, init ) as Promise<PartyChatTokenResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party-voice-token)
	 */
	public async requestPartyVoiceToken( region: Region, shard: Shard, partyId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `parties/v1/parties/${ partyId }/voicetoken`, init ) as Promise<PartyVoiceTokenResponse>;

	}

	// TODO: feat. [DELETE] Party Disable Code

	// TODO: feat. [POST] Party Generate Code

	// TODO: feat. [POST] Party Join By Code

	// Party Endpoints End
	// ===================

	// =====================
	// Store Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party-voice-token)
	 */
	public async requestPrices( shard: Shard ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `store/v1/offers`, init ) as Promise<PricesResponse>;

	}

	// TODO: fix. Storefront api return 404
	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/storefront)
	 */
	public async requestStorefront( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `store/v2/storefront/${ uuid }`, init ) as Promise<StorefrontResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/wallet)
	 */
	public async requestWallet( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `store/v1/wallet/${ uuid }`, init ) as Promise<WalletResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/owned-items)
	 */
	public async requestOwnedItems( shard: Shard, uuid: string, itemType: ItemType ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `store/v1/entitlements/${ uuid }/${ itemType }`, init ) as Promise<OwnedItemsResponse>;

	}

	// Store Endpoints End
	// ===================

	// ========================
	// Pre-Game Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-player)
	 */
	public async requestPreGamePlayer( region: Region, shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `pregame/v1/players/${ uuid }`, init ) as Promise<PregamePlayerResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-match)
	 */
	public async requestPreGameMatch( region: Region, shard: Shard, preGameMatchId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `pregame/v1/matches/${ preGameMatchId }`, init ) as Promise<PregamePlayerResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-loadouts)
	 */
	public async requestPreGameLoadouts( region: Region, shard: Shard, preGameMatchId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `pregame/v1/matches/${ preGameMatchId }/loadouts`, init ) as Promise<PregameLoadoutsResponse>;

	}

	// TODO: feat. [POST] Select Character

	// TODO: feat. [POST] Lock Character

	// TODO: feat. [POST] Pre-Game Quit

	// Pre-Game Endpoints End
	// ======================

	// ============================
	// Current Game Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-player)
	 */
	public async requestCurrentGamePlayer( region: Region, shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `core-game/v1/players/${ uuid }`, init ) as Promise<CurrentGamePlayerResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-match)
	 */
	public async requestCurrentGameMatch( region: Region, shard: Shard, currentGameMatchId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `core-game/v1/matches/${ currentGameMatchId }`, init ) as Promise<CurrentGameMatchResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-loadouts)
	 */
	public async requestCurrentGameLoadouts( region: Region, shard: Shard, currentGameMatchId: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemoteGLZ( region, shard, `core-game/v1/matches/${ currentGameMatchId }/loadouts`, init ) as Promise<CurrentGameLoadoutsResponse>;

	}

	// TODO: feat. [POST] Current Game Quit

	// Current Game Endpoints End
	// ==========================

	// ========================
	// Contract Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/item-upgrades)
	 */
	public async requesItemUpgrades( shard: Shard ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `contract-definitions/v3/item-upgrades`, init ) as Promise<ItemUpgradesResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/contracts)
	 */
	public async requesItemContracts( shard: Shard, uuid: string ) {

		const headers = await this.getAuthClientHeader();
		const init: RequestInit = {
			headers,
			method: 'GET',
		};

		return this.requestRemotePD( shard, `contracts/v1/contracts/${ uuid }`, init ) as Promise<ActivateContractResponse>;

	}

	// TODO: feat. [POST] Activate Contract

	// Contract Endpoints Start
	// ========================

}

export { ValorantAPIManager };
