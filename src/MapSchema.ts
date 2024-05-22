import { EnumSchema } from './EnumSchema';
import { Schema } from './Schema';
import { StringSchema } from './StringSchema';

export type MapSchema = {
	readonly type: 'map';
	readonly keys: string | StringSchema | EnumSchema;
	readonly values: Schema;
};
