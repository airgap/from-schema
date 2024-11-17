import { SchemaBase } from '../generic/SchemaBase';
import { ArrayJsonSchema } from './ArrayJsonSchema';
import { BooleanJsonSchema } from './BooleanJsonSchema';
import { EnumJsonSchemaOf } from './EnumJsonSchemaOf';
import { MapJsonSchema } from './MapJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';
import { ObjectJsonSchema } from './ObjectJsonSchema';
import { StringJsonSchema } from './StringJsonSchema';
import { Primitive } from '../generic';

type UnionableJsonSchema =
	| ArrayJsonSchema
	| BooleanJsonSchema
	| EnumJsonSchemaOf<any>
	| MapJsonSchema
	| NumberJsonSchema
	| ObjectJsonSchema
	| StringJsonSchema
	| Primitive;
export type UnionJsonSchema = SchemaBase & {
	readonly union: readonly UnionableJsonSchema[];
};

export type UnionJsonSchemaOf<M extends UnionableJsonSchema> = SchemaBase & {
	readonly union: readonly M[];
};
