import { SchemaBase } from './SchemaBase';

export type UnionSchemaOf<K> = SchemaBase & {
	readonly enum: readonly K[];
};
