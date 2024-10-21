import path from 'node:path';
import https from 'node:https';
import fs from 'node:fs';
import type { RequestInit } from 'node-fetch';

import { fetchRiot } from '@/fetch-riot';

import type {
	EntitlementsTokenResponse,
	FriendsResponse
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

	throw Error( 'Cannot found CI Server Version' );

	let ciServerVersion: string = '';

	const SHOOTERGAME_LOG_PATH = path.join( process.env[ 'LOCALAPPDATA' ]!, '/VALORANT/Saved/Logs/ShooterGame.log' );

	const shooterGameLogFile = await fs.promises.readFile( SHOOTERGAME_LOG_PATH, 'utf8' );

	const CI_SERER_VERSION_REGEX = /LogShooter: Display: CI server version: (?<version>.+)/;
	const ciServerVersionMatch = CI_SERER_VERSION_REGEX.exec( shooterGameLogFile );
	if ( ciServerVersionMatch ) {

		ciServerVersion = ciServerVersionMatch.groups?.version || '';

	}

	return {
		ciServerVersion
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

export async function requestEntitlementsToken() {

	return requestLocal( 'entitlements/v1/token' ) as Promise<EntitlementsTokenResponse>;

}

export async function requestFriends() {

	return requestLocal( 'chat/v4/friends' ) as Promise<FriendsResponse>;

}
