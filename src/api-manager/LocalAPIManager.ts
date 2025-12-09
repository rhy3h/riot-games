import path from 'node:path';
import https from 'node:https';
import fs from 'node:fs';
import type { RequestInit, BodyInit } from 'node-fetch';

import { z } from 'zod';

import { fetchRiot } from '@/fetch-riot';

import type {
	AccountAliasResponse,
	AllChatInfoResponse,
	ChatHistoryResponse,
	ChatParticipantsResponse,
	ChatSessionResponse,
	ClientRegionResponse,
	CurrentGameChatInfoResponse,
	EntitlementsTokenResponse,
	FriendRequestsResponse,
	FriendsResponse,
	LocalHelpResponse,
	PartyChatInfoResponse,
	PresenceResponse,
	RSOUserInfoResponse,
	SendChatResponse,
	SessionsResponse,
	sendChatEndpoint,
} from 'valorant-api-types';

const LOCAL_AGENT = new https.Agent( {
	rejectUnauthorized: false
} );

class LocalAPIManager {

	constructor() {}

	async loadLockfile(): Promise<Lockfile> {

		const LOCKFILE_PATH = path.join( process.env[ 'LOCALAPPDATA' ]!, 'Riot Games/Riot Client/Config/lockfile' );

		const lockfile = await fs.promises.readFile( LOCKFILE_PATH, 'utf8' );

		const [ clientName, processId, port, token, protocol ] = lockfile.split( ':' );
		const basic = btoa( `riot:${ token }` );

		return {
			clientName,
			processId,
			port,
			token,
			protocol,
			basic
		};

	}

	async loadShooterGameLog(): Promise<ShooterGameLog> {

		let branch: string = undefined;
		let buildVersion: number = undefined;
		let changelist: number = undefined;

		const SHOOTERGAME_LOG_PATH = path.join( process.env[ 'LOCALAPPDATA' ]!, '/VALORANT/Saved/Logs/ShooterGame.log' );

		const shooterGameLogFile = await fs.promises.readFile( SHOOTERGAME_LOG_PATH, 'utf8' );

		const BRANCH_REGEX = /LogShooter: Display: Branch: (?<branch>.+)/;
		const BUILD_VERSION_REGEX = /LogShooter: Display: Build version: (?<buildVersion>.+)/;
		const CHANGE_LIST_REGEX = /LogShooter: Display: Changelist: (?<changelist>.+)/;

		if ( branch === undefined ) {

			const match = BRANCH_REGEX.exec( shooterGameLogFile );
			if ( match ) {

				branch = match.groups?.branch || '';

			}

		}

		if ( buildVersion === undefined ) {

			const match = BUILD_VERSION_REGEX.exec( shooterGameLogFile );
			if ( match ) {

				buildVersion = Number( match.groups?.buildVersion );

			}

		}

		if ( changelist === undefined ) {

			const match = CHANGE_LIST_REGEX.exec( shooterGameLogFile );
			if ( match ) {

				changelist = Number( match.groups?.changelist );

			}

		}

		return {
			branch,
			buildVersion,
			changelist
		};

	}

	async requestLocal( resource: string, method: HttpMethod, body?: BodyInit ) {

		const { port, protocol, basic } = await this.loadLockfile();

		const url = `${ protocol }://127.0.0.1:${ port }/${ resource }`;
		const headers = {
			'Authorization': `Basic ${basic}`
		};
		const init: RequestInit = {
			headers: headers,
			agent: LOCAL_AGENT,
			method: method,
			body: body,
		};

		return fetchRiot( url, init );

	}

	async get( resource: string ) {

		return this.requestLocal( resource, 'GET' );

	}

	async post( resource: string, body: any ) {

		if ( typeof ( body ) !== 'string' ) {

			body = JSON.stringify( body );

		}

		return this.requestLocal( resource, 'POST', body );

	}

	// =====================
	// Local Endpoints Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/local-help)
	 */
	async requestLocalHelp() {

		return this.get( 'help' ) as Promise<LocalHelpResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/sessions)
	 */
	async requestExternalSessions() {

		return this.get( 'product-session/v1/external-sessions' ) as Promise<SessionsResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/rso-user-info)
	 */
	async requestRSOUserInfo() {

		return this.get( 'rso-auth/v1/authorization/userinfo' ) as Promise<RSOUserInfoResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/client-region)
	 */
	async requestClientRegion() {

		return this.get( 'riotclient/region-locale' ) as Promise<ClientRegionResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/account-alias)
	 */
	async requestAccountAlias() {

		return this.get( 'player-account/aliases/v1/active' ) as Promise<AccountAliasResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/entitlements-token)
	 */
	async requestEntitlementsToken() {

		return this.get( 'entitlements/v1/token' ) as Promise<EntitlementsTokenResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/chat-session)
	 */
	async requestChatSession() {

		return this.get( 'chat/v1/session' ) as Promise<ChatSessionResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/friends)
	 */
	async requestFriends() {

		return this.get( 'chat/v4/friends' ) as Promise<FriendsResponse>;

	}

	// TODO: feat. [POST] Send Friend Request

	// TODO: feat. [DELETE] Remove Friend Request

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/presence)
	 */
	async requestPresence() {

		return this.get( 'chat/v4/presences' ) as Promise<PresenceResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/friend-requests)
	 */
	async requestFriendRequests() {

		return this.get( 'chat/v4/friendrequests' ) as Promise<FriendRequestsResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/local-swagger-docs)
	 */
	async requestLocalSwaggerDocs() {

		return this.get( 'swagger/v3/openapi.json' ) as Promise<unknown>;

	}

	// TODO: feat. [WSS] Local WebSocket

	// Local Endpoints End
	// ===================

	// ============================
	// Local Endpoints - Chat Start

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/party-chat-info)
	 */
	async requestPartyChatInfo() {

		return this.get( 'chat/v6/conversations/ares-parties' ) as Promise<PartyChatInfoResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-chat-info)
	 */
	async requestPrePartyChatInfo() {

		return this.get( 'chat/v6/conversations/ares-pregame' ) as Promise<PartyChatInfoResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-chat-info)
	 */
	async requestCurrentGameChatInfo() {

		return this.get( 'chat/v6/conversations/ares-coregame' ) as Promise<CurrentGameChatInfoResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/all-chat-info-info)
	 */
	async requestAllChatInfo() {

		return this.get( 'chat/v6/conversations' ) as Promise<AllChatInfoResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/chat-participants)
	 */
	async requestChatParticipants( cid: string ) {

		return this.get( `chat/v5/participants?cid=${cid}` ) as Promise<ChatParticipantsResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/send-chat)
	 */
	async requestSendChat( body: z.input<typeof sendChatEndpoint.body> ) {

		return this.post( 'chat/v6/messages', body ) as Promise<SendChatResponse>;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/chat-history)
	 */
	async requestChatHistory( cid: string ) {

		return this.get( `chat/v6/messages?cid=${cid}` ) as Promise<ChatHistoryResponse>;

	}

	// Local Endpoints - Chat End
	// ==========================

}

export { LocalAPIManager };
