import { SchemaBase } from './SchemaBase';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';
export type ObjectSchemaWithoutRequired = SchemaBase & {
	readonly type: 'object';
	readonly properties: Record<string, SchemaOrPrimitive>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
};
export type ObjectSchemaWithRequired = ObjectSchemaWithoutRequired & {
	readonly required: readonly string[];
};
export type ObjectSchema =
	| ObjectSchemaWithoutRequired
	| ObjectSchemaWithRequired;
