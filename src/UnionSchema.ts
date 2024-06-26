import { SchemaBase } from './SchemaBase';
import { ArraySchema } from './ArraySchema';
import { BooleanSchema } from './BooleanSchema';
import { EnumSchema } from './EnumSchema';
import { MapSchema } from './MapSchema';
import { NumberSchema } from './NumberSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { Primitive } from './Primitive';

type Unionable =
	| ArraySchema
	| BooleanSchema
	| EnumSchema
	| MapSchema
	| NumberSchema
	| ObjectSchema
	| StringSchema
	| Primitive;
export type UnionSchema = SchemaBase & {
	readonly union: readonly Unionable[];
};

export type UnionSchemaOf<M extends Unionable> = SchemaBase & {
	readonly union: readonly M[];
};
