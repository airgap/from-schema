import { SchemaBase } from '../generic/SchemaBase';
import { BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';

// Schema for `anyOf` (union-like behavior)
export type AnyOfBsonSchema = SchemaBase & {
	readonly anyOf: readonly BsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
