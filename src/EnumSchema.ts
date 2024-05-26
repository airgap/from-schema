import { SchemaBase } from './SchemaBase';
import { StringSchema } from './StringSchema';
import { NumberSchema } from './NumberSchema';

export type EnumMember = string | number | StringSchema | NumberSchema;
export type EnumSchema = SchemaBase & {
	readonly enum: readonly EnumMember[];
};
