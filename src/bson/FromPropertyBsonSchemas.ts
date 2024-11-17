import { ObjectBsonSchema } from './ObjectBsonSchema';
import { PrimitiveOrFromBsonSchema } from './PrimitiveOrFromBsonSchema';

export type FromPropertyBsonSchemas<T extends ObjectBsonSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromBsonSchema<
		T['properties'][K]
	>;
};
