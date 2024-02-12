import { SchemaBase } from './SchemaBase';

export type EnumSchemaOf<K> = SchemaBase & {
	readonly enum: readonly K[];
};
