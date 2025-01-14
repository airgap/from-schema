import { PostgresColumnBase } from '../PostgresColumnBase';
import { PostgresColumnModel } from '../PostgresColumnModel';

export type ArrayColumnModel = PostgresColumnBase & {
	readonly type: 'array';
	readonly items: PostgresColumnModel;
	readonly minItems?: number;
	readonly maxItems?: number;
};
