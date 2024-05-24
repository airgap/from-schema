import { SchemaBase } from './SchemaBase';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';
export type UnionSchema = SchemaBase & {
	readonly union: readonly SchemaOrPrimitive[];
};
