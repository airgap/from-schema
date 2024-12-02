import { SchemaBase } from '../../generic';

export type TimeColumnModel = SchemaBase & {
	type: 'time';
	timezone?: boolean;
	precision?: number;
};
