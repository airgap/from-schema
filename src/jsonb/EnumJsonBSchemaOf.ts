import { SchemaBase } from '../generic/SchemaBase';
import { EnumJsonBMember } from './EnumJsonBSchema';

export type EnumJsonBSchemaOf<M extends EnumJsonBMember> = SchemaBase & {
	readonly enum: readonly M[];
};
