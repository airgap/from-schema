import { SchemaBase } from '../../../generic';

export type CharColumnModel = SchemaBase & {
	readonly type: 'char' | 'character' | 'bpchar';
	readonly length: number;
	readonly pattern?: string;
};
