import { SchemaBase } from '../generic';

export type EnumTsonSchemaMember = string | number;
export type EnumTsonSchema = SchemaBase & {
	readonly enum: readonly EnumTsonSchemaMember[];
};
