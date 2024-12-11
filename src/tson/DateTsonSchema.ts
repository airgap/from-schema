import { SchemaBase } from '../generic';

export type DateTsonSchema = SchemaBase & {
	readonly type: 'date';
	readonly minimum?: Date;
	readonly maximum?: Date;
};
