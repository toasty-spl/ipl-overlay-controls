/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HighlightedMatches = {
	meta: {
		name: string;
		/**
		 * ID of the match, for Battlefy use _id
		 */
		id: string;
		/**
		 * Name of the stage match originates from
		 */
		stageName?: string;
		/**
		 * The time the set was completed at, null if yet to be completed, Stored in ISO format
		 */
		completionTime?: string;
		/**
		 * Round number from provider
		 */
		round?: number;
		/**
		 * Match number from provider
		 */
		match?: number;
		playType?: 'BEST_OF' | 'PLAY_ALL';
	};
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
}[];
