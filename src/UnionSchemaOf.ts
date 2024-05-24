import { SchemaBase } from './SchemaBase';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';

export type UnionSchemaOf<K extends SchemaOrPrimitive> = SchemaBase & {
	readonly union: readonly K[];
};
