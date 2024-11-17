import { SchemaBase } from '../generic/SchemaBase';
import { EnumJsonSchemaMember } from './EnumJsonSchema';

export type EnumJsonSchemaOf<M extends EnumJsonSchemaMember> = SchemaBase & {
	readonly enum: readonly M[];
};
