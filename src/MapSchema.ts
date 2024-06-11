import { EnumSchemaOf } from './EnumSchemaOf';
import { FromSchema } from './FromSchema';
import { Schema } from './Schema';
import { SchemaBase } from './SchemaBase';
import { StringSchema } from './StringSchema';
export type MapSchema = {
	readonly type: 'map';
	readonly keys: StringSchema | EnumSchemaOf<string>;
	readonly values: Schema;
	readonly partial?: boolean;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
};
export type MapSchemaOf<
	K extends StringSchema | EnumSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};

export type FromMapSchema<S extends MapSchema> = S['partial'] extends true
	? {
			-readonly [key in S['keys'] extends EnumSchemaOf<infer M extends string>
				? M
				: string]?: FromSchema<S['values']>;
		}
	: {
			-readonly [key in S['keys'] extends EnumSchemaOf<infer M extends string>
				? M
				: string]: FromSchema<S['values']>;
		};
