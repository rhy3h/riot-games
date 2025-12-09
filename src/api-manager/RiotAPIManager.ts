import type { RequestInit } from 'node-fetch';

import { fetchRiot } from '@/fetch-riot';

import { LocalCredentialManager } from '@/credential-manager/LocalCredentialManager';

import type {
	PlayerInfoResponse
} from 'valorant-api-types';

class RiotAPIManager {

	private readonly _credentialManager: LocalCredentialManager;

	constructor( credentialManager: LocalCredentialManager ) {

		this._credentialManager = credentialManager;

	}

	/**
	 * [API Docs](https://valapidocs.techchrism.me/endpoint/player-info)
	 */
	public async requestUserinfo() {

		const url = 'https://auth.riotgames.com/userinfo';
		const headers = {
			'Authorization': 'Bearer ' + await this._credentialManager.getToken(),
		};
		const init: RequestInit = {
			headers
		};

		return fetchRiot( url, init ) as Promise<PlayerInfoResponse>;

	}

}

export { RiotAPIManager };
