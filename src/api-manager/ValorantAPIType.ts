export const REGION_NORTH_AMERICA = 'na';
export const REGION_LATIN_AMERICA = 'latam';
export const REGION_BRAZIL = 'br';
export const REGION_EUROPE = 'eu';
export const REGION_ASIA_PACIFIC = 'ap';
export const REGION_KOREA = 'kr';

export type Region =
	typeof REGION_NORTH_AMERICA
	| typeof REGION_LATIN_AMERICA
	| typeof REGION_BRAZIL
	| typeof REGION_EUROPE
	| typeof REGION_ASIA_PACIFIC
	| typeof REGION_KOREA;

export const SHARD_LATIN_AMERICA_BRAZIL_NORTH_AMERICA = 'na';
export const SHARD_NORTH_AMERICA = 'pbe';
export const SHARD_EUROPEAN_UNION = 'eu';
export const SHARD_ASIA_PACIFIC = 'ap';
export const SHARD_KOREA = 'kr';

export type Shard =
	typeof SHARD_LATIN_AMERICA_BRAZIL_NORTH_AMERICA
	| typeof SHARD_NORTH_AMERICA
	| typeof SHARD_EUROPEAN_UNION
	| typeof SHARD_ASIA_PACIFIC
	| typeof SHARD_KOREA;

export const ITEM_TYPE_AGENTS = '01bb38e1-da47-4e6a-9b3d-945fe4655707';
export const ITEM_TYPE_CONTRACTS = 'f85cb6f7-33e5-4dc8-b609-ec7212301948';
export const ITEM_TYPE_SPRAYS = 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475';
export const ITEM_TYPE_GUN_BUDDIES = 'dd3bf334-87f3-40bd-b043-682a57a8dc3a';
export const ITEM_TYPE_CARDS = '3f296c07-64c3-494c-923b-fe692a4fa1bd';
export const ITEM_TYPE_SKINS = 'e7c63390-eda7-46e0-bb7a-a6abdacd2433';
export const ITEM_TYPE_SKIN_VARIANTS = '3ad1b2b2-acdb-4524-852f-954a76ddae0a';
export const ITEM_TYPE_SKIN_TITLES = 'de7caa6b-adf7-4588-bbd1-143831e786c6';

export type ItemType =
	typeof ITEM_TYPE_AGENTS
	| typeof ITEM_TYPE_CONTRACTS
	| typeof ITEM_TYPE_SPRAYS
	| typeof ITEM_TYPE_GUN_BUDDIES
	| typeof ITEM_TYPE_CARDS
	| typeof ITEM_TYPE_SKINS
	| typeof ITEM_TYPE_SKIN_VARIANTS
	| typeof ITEM_TYPE_SKIN_TITLES;
