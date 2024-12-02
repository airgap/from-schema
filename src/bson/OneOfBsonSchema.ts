import { SchemaBase } from '../generic/SchemaBase';
import { BsonSchemaOrPrimitive } from './BsonSchemaOrPrimitive';

// Schema for `oneOf` (exclusive union behavior)
export type OneOfBsonSchema = SchemaBase & {
	readonly oneOf: readonly BsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly examples?: unknown[];
};
