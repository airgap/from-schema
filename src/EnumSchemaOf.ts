import { SchemaBase } from './SchemaBase';
import { EnumMember } from './EnumSchema';

export type EnumSchemaOf<M extends EnumMember> = SchemaBase & {
	readonly enum: readonly M[];
};
