import { ObjectJsonBSchema } from './ObjectJsonBSchema';
import { PrimitiveOrFromJsonBSchema } from './PrimitiveOrFromJsonBSchema';

export type FromPropertyJsonBSchemas<T extends ObjectJsonBSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromJsonBSchema<
		T['properties'][K]
	>;
};
