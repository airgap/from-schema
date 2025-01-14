import { PostgresColumnBase } from '../PostgresColumnBase';

export type EnumColumnModel = PostgresColumnBase & {
	readonly type: 'enum';
	readonly enum: readonly string[];
};
