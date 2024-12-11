import { EnumTsonSchemaOf } from './EnumTsonSchemaOf';
import { FromTsonSchema } from './FromTsonSchema';
import { TsonSchema } from './TsonSchema';
import { SchemaBase } from '../generic';
import { StringTsonSchema } from './StringTsonSchema';
export type MapTsonSchema = {
	readonly type: 'map';
	readonly keys: StringTsonSchema | EnumTsonSchemaOf<string>;
	readonly values: TsonSchema;
	readonly partial?: boolean;
	readonly default?: Record<string, unknown>;
	readonly examples?: Record<string, unknown>[];
};
export type MapTsonSchemaOf<
	K extends StringTsonSchema | EnumTsonSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};

export type FromMapTsonSchema<S extends MapTsonSchema> =
	S['partial'] extends true
		? {
				-readonly [key in S['keys'] extends EnumTsonSchemaOf<
					infer M extends string
				>
					? M
					: string]?: FromTsonSchema<S['values']>;
			}
		: {
				-readonly [key in S['keys'] extends EnumTsonSchemaOf<
					infer M extends string
				>
					? M
					: string]: FromTsonSchema<S['values']>;
			};
