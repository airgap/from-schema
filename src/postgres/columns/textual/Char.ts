import { PostgresColumnBase } from '../../PostgresColumnBase';

export type CharColumnModel = PostgresColumnBase & {
	readonly type: 'char' | 'character' | 'bpchar';
	readonly length: number;
	readonly pattern?: string;
};
