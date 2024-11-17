import { SchemaBase } from './SchemaBase';

export type NumberSchemaBase = SchemaBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly examples?: number[];
};
