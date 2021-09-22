/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface NextRound {
	teamA: {
		id: string;
		name: string;
		logoUrl?: string;
		showLogo: boolean;
		players: {
			name: string;
			[k: string]: unknown;
		}[];
		[k: string]: unknown;
	};
	teamB: {
		id: string;
		name: string;
		logoUrl?: string;
		showLogo: boolean;
		players: {
			name: string;
			[k: string]: unknown;
		}[];
		[k: string]: unknown;
	};
	round: {
		id: string;
		name: string;
	};
	showOnStream: boolean;
	games: {
		stage: string;
		mode: string;
		[k: string]: unknown;
	}[];
}
