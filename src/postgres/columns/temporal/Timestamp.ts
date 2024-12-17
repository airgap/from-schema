import { SchemaBase } from '../../../generic';

export type TimestampColumnModel = SchemaBase & {
	type: 'timestamp' | 'timestamptz';
	timezone?: boolean;
	precision?: number;
};
