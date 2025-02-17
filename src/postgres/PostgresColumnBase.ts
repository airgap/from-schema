import { SchemaBase } from '../generic';

export type PostgresColumnBase = SchemaBase & {
	readonly unique?: boolean;
	readonly primaryKey?: boolean;
	readonly generated?: {
		readonly as: string;
		readonly from?: string;
		readonly stored?: boolean;
	};
	readonly checks?: string[];
};
