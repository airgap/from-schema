import { ObjectJsonSchema } from './ObjectJsonSchema';
import { PrimitiveOrFromJsonSchema } from './PrimitiveOrFromJsonSchema';

export type FromPropertySchemas<T extends ObjectJsonSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromJsonSchema<
		T['properties'][K]
	>;
};
