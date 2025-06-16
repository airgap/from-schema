import { ObjectTsonSchema } from './ObjectTsonSchema';
import { PrimitiveOrFromTsonSchema } from './PrimitiveOrFromTsonSchema';

export type FromPropertySchemasTson<T extends ObjectTsonSchema> =
	T['properties'] extends Record<string, any>
		? {
				-readonly [K in keyof T['properties']]: PrimitiveOrFromTsonSchema<
					T['properties'][K]
				>;
			}
		: Record<string, never>;
