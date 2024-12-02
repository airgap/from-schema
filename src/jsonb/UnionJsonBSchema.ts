import { SchemaBase } from '../generic/SchemaBase';
import { ArrayJsonBSchema } from './ArrayJsonBSchema';
import { BooleanJsonBSchema } from './BooleanJsonBSchema';
import { EnumJsonBSchema } from './EnumJsonBSchema';
import { MapJsonBSchema } from './MapJsonBSchema';
import { NumberJsonBSchema } from './NumberJsonBSchema';
import { ObjectJsonBSchema } from './ObjectJsonBSchema';
import { StringJsonBSchema } from './StringJsonBSchema';
import { Primitive } from '../generic/Primitive';

type UnionableJsonB =
	| ArrayJsonBSchema
	| BooleanJsonBSchema
	| EnumJsonBSchema
	| MapJsonBSchema
	| NumberJsonBSchema
	| ObjectJsonBSchema
	| StringJsonBSchema
	| Primitive;
export type UnionJsonBSchema = SchemaBase & {
	readonly oneOf: readonly UnionableJsonB[];
};

export type UnionJsonBSchemaOf<M extends UnionableJsonB> = SchemaBase & {
	readonly oneOf: readonly M[];
};
