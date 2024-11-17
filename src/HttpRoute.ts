import { ObjectJsonSchema } from './json';
import { SchemaBase } from './generic/SchemaBase';

export type HttpRoute = SchemaBase & {
	readonly request: ObjectJsonSchema;
	readonly response: ObjectJsonSchema;
	readonly authenticated: boolean;
};
