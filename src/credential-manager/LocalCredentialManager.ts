import { requestEntitlementsToken } from '@/api-manager/LocalAPIManager';

const expirationDiff = 60 * 1000;

export class LocalCredentialManager {

	private _entitlement: string | null = null;

	private _token: string | null = null;
	private _tokenExpiration: number = 0;

	constructor() {}

	public async getEntitlement(): Promise<string> {

		if ( ! this._tokenExpiration ) {

			await this._requestCredentials();

		}

		return this._entitlement!;

	}

	public async getToken(): Promise<string> {

		if ( Date.now() > this._tokenExpiration ) {

			await this._requestCredentials();

		}

		return this._token!;

	}

	private async _requestCredentials(): Promise<void> {

		const data = await requestEntitlementsToken();

		this._token = data.accessToken;
		this._entitlement = data.token;

		const tokenJwtPayload = ( JSON.parse( atob( this._token!.split( '.' )[ 1 ] ) ) as ValorantJWTPayload );
		this._tokenExpiration = ( tokenJwtPayload.exp * 1000 ) - expirationDiff;

	}

}
