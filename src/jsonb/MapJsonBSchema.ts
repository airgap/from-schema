import { EnumJsonBSchemaOf } from './EnumJsonBSchemaOf';
import { FromJsonBSchema } from './FromJsonBSchema';
import { SchemaBase } from '../generic/SchemaBase';
import { StringJsonBSchema } from './StringJsonBSchema';
import { JsonBSchema } from './JsonBSchemaOrPrimitive';
export type MapJsonBSchema = {
	readonly type: 'map';
	readonly keys: StringJsonBSchema | EnumJsonBSchemaOf<string>;
	readonly values: JsonBSchema;
	readonly partial?: boolean;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
};
export type MapJsonBSchemaOf<
	K extends StringJsonBSchema | EnumJsonBSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};

export type FromMapJsonBSchema<S extends MapJsonBSchema> =
	S['partial'] extends true
		? {
				-readonly [key in S['keys'] extends EnumJsonBSchemaOf<
					infer M extends string
				>
					? M
					: string]?: FromJsonBSchema<S['values']>;
			}
		: {
				-readonly [key in S['keys'] extends EnumJsonBSchemaOf<
					infer M extends string
				>
					? M
					: string]: FromJsonBSchema<S['values']>;
			};
