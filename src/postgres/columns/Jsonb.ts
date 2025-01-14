import { JsonSchema } from '../../json';
import { PostgresColumnBase } from '../PostgresColumnBase';

export type JsonbColumnModel = PostgresColumnBase & {
	readonly type: 'jsonb';
	readonly schema?: JsonSchema;
};
