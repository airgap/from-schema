import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type ExclusiveTsonSchema = SchemaBase & {
	readonly oneOf: readonly TsonSchemaOrPrimitive[];
	readonly description?: string;
	readonly default?: unknown;
	readonly examples?: unknown[];
};

export type ExclusiveTsonSchemaOf<M extends TsonSchemaOrPrimitive> =
	SchemaBase & {
		readonly oneOf: readonly M[];
		readonly description?: string;
		readonly default?: unknown;
		readonly examples?: unknown[];
	};
