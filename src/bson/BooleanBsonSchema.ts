import { SchemaBase } from '../generic';

export type BooleanBsonSchema = SchemaBase & {
	readonly bsonType: 'bool';
	readonly examples?: [true, false] | [false, true] | [true] | [false] | [];
};
