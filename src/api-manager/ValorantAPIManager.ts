import type { RequestInit } from 'node-fetch';

import { CLIENT_PLATFORM } from '@/constants';

import { Shard, Region, ItemType } from '@/api-manager/ValorantAPIType';

import { APIManager } from '@/api-manager/APIManager';

import { LocalAPIManager } from '@/api-manager/LocalAPIManager';
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

class ValorantAPIManager extends APIManager {

	private readonly _credentialManager: LocalCredentialManager;

	private _ciServerVersion: string | null = null;

	constructor( credentialManager: LocalCredentialManager ) {

		super();

		this._credentialManager = credentialManager;

	}

	private async requestRemotePD<T>( shard: Shard, resource: string, init: RequestInit ) {

		const url = `https://pd.${ shard }.a.pvp.net/${ resource }`;

		const result = await this.fetchRiot<T>( url, init );

		return result;

	}

	private async requestRemoteShared<T>( shard: Shard, resource: string, init: RequestInit ) {

		const url = `https://shared.${ shard }.a.pvp.net/${ resource }`;

		const result = await this.fetchRiot<T>( url, init );

		return result;

	}

	private async requestRemoteGLZ<T>( region: Region, shard: Shard, resource: string, init: RequestInit ) {

		const url = `https://glz-${ region }-1.${ shard }.a.pvp.net/${ resource }`;

		const result = await this.fetchRiot<T>( url, init );

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
		} = await new LocalAPIManager().loadShooterGameLog();

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

		return this.requestRemoteShared<FetchContentResponse>( shard, `content-service/v3/content`, init );

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

		return this.requestRemotePD<AccountXPResponse>( shard, `account-xp/v1/players/${ uuid }`, init );

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

		return this.requestRemotePD<PlayerLoadoutResponse>( shard, `personalization/v2/players/${ uuid }/playerloadout`, init );

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

		return this.requestRemotePD<PlayerMMRResponse>( shard, `mmr/v1/players/${ uuid }`, init );

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

		return this.requestRemotePD<MatchHistoryResponse>( shard, `match-history/v1/history/${ uuid }`, init );

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

		return this.requestRemotePD<MatchDetailsResponse>( shard, `match-details/v1/matches/${ matchID }`, init );

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

		return this.requestRemotePD<CompetitiveUpdatesResponse>( shard, `mmr/v1/players/${ uuid }/competitiveupdates`, init );

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

		return this.requestRemoteGLZ<PartyResponse>( region, shard, `parties/v1/parties/${ partyId }`, init );

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

		return this.requestRemoteGLZ<PartyPlayerResponse>( region, shard, `parties/v1/players/${ uuid }`, init );

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

		return this.requestRemoteGLZ<CustomGameConfigsResponse>( region, shard, `parties/v1/parties/customgameconfigs`, init );

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

		return this.requestRemoteGLZ<PartyChatTokenResponse>( region, shard, `parties/v1/parties/${ partyId }/muctoken`, init );

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

		return this.requestRemoteGLZ<PartyVoiceTokenResponse>( region, shard, `parties/v1/parties/${ partyId }/voicetoken`, init );

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

		return this.requestRemotePD<PricesResponse>( shard, `store/v1/offers`, init );

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

		return this.requestRemotePD<StorefrontResponse>( shard, `store/v2/storefront/${ uuid }`, init );

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

		return this.requestRemotePD<WalletResponse>( shard, `store/v1/wallet/${ uuid }`, init );

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

		return this.requestRemotePD<OwnedItemsResponse>( shard, `store/v1/entitlements/${ uuid }/${ itemType }`, init );

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

		return this.requestRemoteGLZ<PregamePlayerResponse>( region, shard, `pregame/v1/players/${ uuid }`, init );

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

		return this.requestRemoteGLZ<PregamePlayerResponse>( region, shard, `pregame/v1/matches/${ preGameMatchId }`, init );

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

		return this.requestRemoteGLZ<PregameLoadoutsResponse>( region, shard, `pregame/v1/matches/${ preGameMatchId }/loadouts`, init );

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

		return this.requestRemoteGLZ<CurrentGamePlayerResponse>( region, shard, `core-game/v1/players/${ uuid }`, init );

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

		return this.requestRemoteGLZ<CurrentGameMatchResponse>( region, shard, `core-game/v1/matches/${ currentGameMatchId }`, init );

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

		return this.requestRemoteGLZ<CurrentGameLoadoutsResponse>( region, shard, `core-game/v1/matches/${ currentGameMatchId }/loadouts`, init );

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

		return this.requestRemotePD<ItemUpgradesResponse>( shard, `contract-definitions/v3/item-upgrades`, init );

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

		return this.requestRemotePD<ActivateContractResponse>( shard, `contracts/v1/contracts/${ uuid }`, init );

	}

	// TODO: feat. [POST] Activate Contract

	// Contract Endpoints Start
	// ========================

}

export { ValorantAPIManager };
