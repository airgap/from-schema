import { SchemaBase } from './SchemaBase';
import { SchemaOrPrimitive } from './SchemaOrPrimitive';

export type ArraySchema = SchemaBase & {
	readonly type: 'array';
	readonly items: SchemaOrPrimitive;
	readonly maxLength?: number;
	readonly minLength?: number;
};
