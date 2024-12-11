import { SchemaBase } from '../generic/SchemaBase';
import { EnumTsonSchemaMember } from './EnumTsonSchema';

export type EnumTsonSchemaOf<M extends EnumTsonSchemaMember> = SchemaBase & {
	readonly enum: readonly M[];
};
