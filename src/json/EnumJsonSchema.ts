import { SchemaBase } from '../generic';
import { StringJsonSchema } from './StringJsonSchema';
import { NumberJsonSchema } from './NumberJsonSchema';

export type EnumJsonSchemaMember =
	| string
	| number
	| StringJsonSchema
	| NumberJsonSchema;
export type EnumJsonSchema = SchemaBase & {
	readonly enum: readonly EnumJsonSchemaMember[];
};
