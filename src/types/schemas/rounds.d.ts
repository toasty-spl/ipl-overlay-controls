/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Team = {
	id: string;
	name: string;
	logoUrl?: string;
	players: {
		name: string;
		[k: string]: any;
	}[];
	[k: string]: any;
} & {
	score: number;
	[k: string]: any;
};

export interface Rounds {
	[k: string]: Round;
}
export interface Round {
	meta: {
		name: string;
		isCompleted: boolean;
		[k: string]: any;
	};
	games: Game[];
	teamA?: Team;
	teamB?: Team;
	[k: string]: any;
}
export interface Game {
	winner: 'none' | 'alpha' | 'bravo';
	stage: string;
	mode: string;
	color?: {
		index: number;
		title: string;
		clrA: string;
		clrB: string;
		categoryName: string;
		[k: string]: any;
	} & {
		colorsSwapped: boolean;
		[k: string]: any;
	};
	[k: string]: any;
}
