import { SchemaBase } from './SchemaBase';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';

export type UnionSchemaOf<M extends SchemaOrPrimitive> = SchemaBase & {
	readonly union: readonly M[];
};
