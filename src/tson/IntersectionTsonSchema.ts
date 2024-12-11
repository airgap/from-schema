import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type IntersectionTsonSchema = SchemaBase & {
	readonly allOf: readonly TsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};
