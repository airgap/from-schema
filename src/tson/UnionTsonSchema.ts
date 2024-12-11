import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type UnionTsonSchema = SchemaBase & {
	readonly anyOf: readonly TsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};
