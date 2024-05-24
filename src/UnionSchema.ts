import { SchemaBase } from './SchemaBase';
import { Primitive } from './Primitive';
import { ObjectSchema } from './ObjectSchema';
import { ArraySchema } from './ArraySchema';
import { StringSchema } from './StringSchema';
import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';
export type UnionSchema = SchemaBase & {
	readonly union: readonly (
		| Primitive
		| ObjectSchema
		| ArraySchema
		| StringSchema
		| BooleanSchema
		| NumberSchema
	)[];
};
