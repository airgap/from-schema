import { ObjectSchema } from './ObjectSchema';
import { PrimitiveOrFromSchema } from './PrimitiveOrFromSchema';

export type FromPropertySchemas<T extends ObjectSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromSchema<
		T['properties'][K]
	>;
};
