import { SchemaBase } from '../generic';
import { TsonSchemaOrPrimitive } from './TsonSchemaOrPrimitive';

export type ObjectTsonSchemaWithoutRequired = SchemaBase & {
	readonly type: 'object';
	readonly properties?: Record<string, TsonSchemaOrPrimitive>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
	readonly additionalProperties?: false | TsonSchemaOrPrimitive;
	readonly patternProperties?: false | Record<string, TsonSchemaOrPrimitive>;
};

export type ObjectTsonSchemaWithRequired = ObjectTsonSchemaWithoutRequired & {
	readonly required: readonly string[];
};

export type ObjectTsonSchema =
	| ObjectTsonSchemaWithoutRequired
	| ObjectTsonSchemaWithRequired;
