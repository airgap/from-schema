import { SchemaBase } from '../generic/SchemaBase';

export type NumberJsonBSchemaBase = SchemaBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly examples?: number[];
};
