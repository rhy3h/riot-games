
interface Lockfile {
	clientName: string;
	processId: string;
	port: string;
	token: string;
	protocol: string;
	basic: string;
}

interface ShooterGameLog {
	branch: string;
	buildVersion: number;
	changelist: number;
}

interface ValorantJWTPayload {
	cid: string;
	clm: string[];
	dat: {
		c: string;
		lid: string;
	};
	exp: number;
	iat: number;
	iss: string;
	jti: string;
	scp: string[];
	sub: string;
}

/**
 * Type from [Version](https://valorant-api.com/v1/version)
 */
interface ValorantVersion {
	manifestId: string;
	branch: string;
	version: string;
	buildVersion: string;
	engineVersion: string;
	riotClientVersion: string;
	riotClientBuild: string;
	buildDate: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
