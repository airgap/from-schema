import { SchemaBase } from './SchemaBase';
import { StringSchema } from './StringSchema';
import { NumberSchema } from './NumberSchema';
export type EnumSchema = SchemaBase & {
	readonly enum: readonly (string | number | StringSchema | NumberSchema)[];
};
