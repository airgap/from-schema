import { SchemaBase } from './SchemaBase';

export type UnionSchemaOf<K> = SchemaBase & {
	readonly union: readonly K[];
};
