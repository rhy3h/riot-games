import type { RequestInit } from 'node-fetch';

import { APIManager } from '@/api-manager/APIManager';

import { LocalCredentialManager } from '@/credential-manager/LocalCredentialManager';

import type {
	PlayerInfoResponse
} from 'valorant-api-types';

class RiotAPIManager extends APIManager {

	private readonly _credentialManager: LocalCredentialManager;

	constructor( credentialManager: LocalCredentialManager ) {

		super();

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

		return this.fetch( url, init ) as Promise<PlayerInfoResponse>;

	}

}

export { RiotAPIManager };
