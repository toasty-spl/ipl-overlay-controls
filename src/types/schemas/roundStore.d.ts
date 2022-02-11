/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface RoundStore {
	[k: string]: Round;
}
export interface Round {
	meta: {
		name: string;
		type: 'BEST_OF' | 'PLAY_ALL';
		[k: string]: unknown;
	};
	games: RoundGame[];
	[k: string]: unknown;
}
export interface RoundGame {
	stage: string;
	mode: string;
	[k: string]: unknown;
}
