import { SchemaBase } from './SchemaBase';
import { Primitive } from './Primitive';
import { ObjectSchema } from './ObjectSchema';
import { ArraySchema } from './ArraySchema';
import { StringSchema } from './StringSchema';
import { BooleanSchema } from './BooleanSchema';
import { NumberSchema } from './NumberSchema';
export type EnumSchema = SchemaBase & {
	readonly enum: readonly (
		| Primitive
		| ObjectSchema
		| ArraySchema
		| StringSchema
		| BooleanSchema
		| NumberSchema
	)[];
};
