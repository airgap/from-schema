import { ObjectTsonSchema } from './ObjectTsonSchema';
import { PrimitiveOrFromTsonSchema } from './PrimitiveOrFromTsonSchema';

export type FromPropertySchemasTson<T extends ObjectTsonSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromTsonSchema<
		T['properties'][K]
	>;
};
