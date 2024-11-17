import { EnumBsonSchemaOf } from './EnumBsonSchemaOf';
import { FromBsonSchema } from './FromBsonSchema';
import { SchemaBase } from '../generic/SchemaBase';
import { StringBsonSchema } from './StringBsonSchema';
import { BsonSchema } from './BsonSchemaOrPrimitive';
export type MapBsonSchema = {
	readonly type: 'map';
	readonly keys: StringBsonSchema | EnumBsonSchemaOf<string>;
	readonly values: BsonSchema;
	readonly partial?: boolean;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
};
export type MapBsonSchemaOf<
	K extends StringBsonSchema | EnumBsonSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};

export type FromMapBsonSchema<S extends MapBsonSchema> =
	S['partial'] extends true
		? {
				-readonly [key in S['keys'] extends EnumBsonSchemaOf<
					infer M extends string
				>
					? M
					: string]?: FromBsonSchema<S['values']>;
			}
		: {
				-readonly [key in S['keys'] extends EnumBsonSchemaOf<
					infer M extends string
				>
					? M
					: string]: FromBsonSchema<S['values']>;
			};
