import { EnumJsonSchemaOf } from './EnumJsonSchemaOf';
import { FromJsonSchema } from './FromJsonSchema';
import { JsonSchema } from './JsonSchema';
import { SchemaBase } from '../generic';
import { StringJsonSchema } from './StringJsonSchema';
export type MapJsonSchema = {
	readonly type: 'map';
	readonly keys: StringJsonSchema | EnumJsonSchemaOf<string>;
	readonly values: JsonSchema;
	readonly partial?: boolean;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
};
export type MapJsonSchemaOf<
	K extends StringJsonSchema | EnumJsonSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};

export type FromMapJsonSchema<S extends MapJsonSchema> =
	S['partial'] extends true
		? {
				-readonly [key in S['keys'] extends EnumJsonSchemaOf<
					infer M extends string
				>
					? M
					: string]?: FromJsonSchema<S['values']>;
			}
		: {
				-readonly [key in S['keys'] extends EnumJsonSchemaOf<
					infer M extends string
				>
					? M
					: string]: FromJsonSchema<S['values']>;
			};
