import { SchemaBase } from '../../../generic';

export type TimestampColumnModel = SchemaBase & {
	type: 'timestamp';
	timezone?: boolean;
	precision?: number;
};
