import { SchemaBase } from '../generic/SchemaBase';

export type NumberBsonSchemaBase = SchemaBase & {
	readonly minimum?: number;
	readonly maximum?: number;
	readonly examples?: number[];
};
