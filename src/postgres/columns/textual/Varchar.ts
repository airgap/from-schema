import { PostgresColumnBase } from '../../PostgresColumnBase';

export type VarcharColumnModel = PostgresColumnBase & {
	readonly type: 'varchar' | 'character varying';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
	readonly enum?: string[];
	readonly checks?: string[];
};
