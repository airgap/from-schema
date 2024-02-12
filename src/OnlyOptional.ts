import { ObjectSchema, ObjectSchemaWithRequired } from './ObjectSchema';
import { FromPropertySchemas } from './FromPropertySchemas';
import { RequiredPropOf } from './RequiredPropOf';

export type OnlyOptional<T extends ObjectSchema> =
	T extends ObjectSchemaWithRequired
		? Partial<Omit<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Partial<T['properties']>;
