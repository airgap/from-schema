import { SchemaBase } from '../../../generic';

export type CharColumnModel = SchemaBase & {
	type: 'char' | 'character' | 'bpchar';
	length: number;
};
