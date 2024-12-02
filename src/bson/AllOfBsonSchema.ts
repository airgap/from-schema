import { SchemaBase } from '../generic/SchemaBase';
import { BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';

// Schema for `allOf` (intersection behavior)
export type AllOfBsonSchema = SchemaBase & {
	readonly allOf: readonly BsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
