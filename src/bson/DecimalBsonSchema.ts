import { SchemaBase } from '../generic';

export type DecimalBsonSchema = SchemaBase & {
	readonly bsonType: 'decimal';
};
