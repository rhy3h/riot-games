import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: [ "<rootDir>/test" ],
	extensionsToTreatAsEsm: [ ".ts" ],
	coverageProvider: "v8",
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		"\\.[jt]sx?$": [
			"babel-jest",
			{
				"babelrc": false,
				"presets": [ "@babel/preset-typescript" ]
			}
		]
	},
};

export default config;
