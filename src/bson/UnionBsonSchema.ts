import { SchemaBase } from '../generic/SchemaBase';
import { ArrayBsonSchema } from './ArrayBsonSchema';
import { BooleanBsonSchema } from './BooleanBsonSchema';
import { EnumBsonSchema } from './EnumBsonSchema';
import { MapBsonSchema } from './MapBsonSchema';
import { NumberBsonSchema } from './NumberBsonSchema';
import { ObjectBsonSchema } from './ObjectBsonSchema';
import { StringBsonSchema } from './StringBsonSchema';
import { ObjectIdBsonSchema } from './ObjectIdBsonSchema';
import { Primitive } from '../generic/Primitive';

type Unionable =
	| ArrayBsonSchema
	| BooleanBsonSchema
	| EnumBsonSchema
	| MapBsonSchema
	| NumberBsonSchema
	| ObjectBsonSchema
	| ObjectIdBsonSchema
	| StringBsonSchema
	| Primitive;
export type UnionBsonSchema = SchemaBase & {
	readonly union: readonly Unionable[];
};

export type UnionBsonSchemaOf<M extends Unionable> = SchemaBase & {
	readonly union: readonly M[];
};
