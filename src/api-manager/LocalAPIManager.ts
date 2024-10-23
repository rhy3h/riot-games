import path from 'node:path';
import https from 'node:https';
import fs from 'node:fs';
import type { RequestInit } from 'node-fetch';

import { fetchRiot } from '@/fetch-riot';

import type {
	AccountAliasResponse,
	ChatSessionResponse,
	ClientRegionResponse,
	EntitlementsTokenResponse,
	FriendRequestsResponse,
	FriendsResponse,
	LocalHelpResponse,
	PresenceResponse,
	RSOUserInfoResponse,
	SessionsResponse
} from 'valorant-api-types';

const LOCAL_AGENT = new https.Agent( {
	rejectUnauthorized: false
} );

export async function loadLockfile(): Promise<Lockfile> {

	const LOCKFILE_PATH = path.join( process.env[ 'LOCALAPPDATA' ]!, 'Riot Games\\Riot Client\\Config\\lockfile' );

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

export async function loadShooterGameLog(): Promise<ShooterGameLog> {

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

async function requestLocal( resource: string ) {

	const { port, protocol, basic } = await loadLockfile();

	const url = `${ protocol }://127.0.0.1:${ port }/${ resource }`;
	const headers = {
		'Authorization': `Basic ${basic}`
	};
	const init: RequestInit = {
		headers: headers,
		agent: LOCAL_AGENT,
	};

	return fetchRiot( url, init );

}

// =====================
// Local Endpoints Start

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/local-help)
 */
export async function requestLocalHelp() {

	return requestLocal( 'help' ) as Promise<LocalHelpResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/sessions)
 */
export async function requestExternalSessions() {

	return requestLocal( 'product-session/v1/external-sessions' ) as Promise<SessionsResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/rso-user-info)
 */
export async function requestRSOUserInfo() {

	return requestLocal( 'rso-auth/v1/authorization/userinfo' ) as Promise<RSOUserInfoResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/client-region)
 */
export async function requestClientRegion() {

	return requestLocal( 'riotclient/region-locale' ) as Promise<ClientRegionResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/account-alias)
 */
export async function requestAccountAlias() {

	return requestLocal( 'player-account/aliases/v1/active' ) as Promise<AccountAliasResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/entitlements-token)
 */
export async function requestEntitlementsToken() {

	return requestLocal( 'entitlements/v1/token' ) as Promise<EntitlementsTokenResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/chat-session)
 */
export async function requestChatSession() {

	return requestLocal( 'chat/v1/session' ) as Promise<ChatSessionResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/friends)
 */
export async function requestFriends() {

	return requestLocal( 'chat/v4/friends' ) as Promise<FriendsResponse>;

}

// TODO: feat. [POST] Send Friend Request

// TODO: feat. [DELETE] Remove Friend Request

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/presence)
 */
export async function requestPresence() {

	return requestLocal( 'chat/v4/presences' ) as Promise<PresenceResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/friend-requests)
 */
export async function requestFriendRequests() {

	return requestLocal( 'chat/v4/friendrequests' ) as Promise<FriendRequestsResponse>;

}

/**
 * [API Docs](https://valapidocs.techchrism.me/endpoint/local-swagger-docs)
 */
export async function requestLocalSwaggerDocs() {

	return requestLocal( 'swagger/v3/openapi.json' ) as Promise<unknown>;

}

// TODO: feat. [WSS] Local WebSocket

// Local Endpoints End
// ===================

// ============================
// Local Endpoints - Chat Start

// TODO: feat. [GET] Party Chat Info

// TODO: feat. [GET] Pre-Game Chat Info

// TODO: feat. [GET] Current Game Chat Info

// TODO: feat. [GET] All Chat Info

// TODO: feat. [GET] Chat Participants

// TODO: feat. [POST] Send Chat

// TODO: feat. [GET] Chat History

// Local Endpoints - Chat End
// ==========================
