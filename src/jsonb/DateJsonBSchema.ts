import { SchemaBase } from '../generic';

export type DateJsonBSchema = SchemaBase & {
	readonly type: 'date';
	readonly minimum?: Date;
	readonly maximum?: Date;
};
