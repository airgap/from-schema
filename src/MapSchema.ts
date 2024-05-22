import { EnumSchema } from './EnumSchema';
import { Schema } from './Schema';
import { StringSchema } from './StringSchema';

export type MapSchema = {
	type: 'map';
	keys: StringSchema | EnumSchema;
	values: Schema;
};
