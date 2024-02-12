import { ObjectSchema } from './ObjectSchema';
import { SchemaBase } from './SchemaBase';

export type HttpRoute = SchemaBase & {
	readonly request: ObjectSchema;
	readonly response: ObjectSchema;
	readonly authenticated: boolean;
};
