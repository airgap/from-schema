import { SchemaBase } from '../generic/SchemaBase';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

// Schema for `oneOf` (exclusive union behavior)
export type OneOfTsonSchema = SchemaBase & {
	readonly oneOf: readonly TsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};
