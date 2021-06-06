/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ScoreboardData {
	flavorText?: string;
	colorInfo?: {
		index?: number;
		title?: string;
		clrA?: string;
		clrB?: string;
		[k: string]: any;
	};
	swapColorOrder?: boolean;
	teamAInfo?: {
		name?: string;
		players?: {
			name?: string;
			[k: string]: any;
		}[];
		[k: string]: any;
	};
	teamBInfo?: {
		name?: string;
		players?: {
			name?: string;
			[k: string]: any;
		}[];
		[k: string]: any;
	};
}
