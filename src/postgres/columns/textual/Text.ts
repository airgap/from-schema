import { PostgresColumnBase } from '../../PostgresColumnBase';

export type TextColumnModel = PostgresColumnBase & {
	readonly type: 'text';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
};
