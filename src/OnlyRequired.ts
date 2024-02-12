import { ObjectSchema, ObjectSchemaWithRequired } from './ObjectSchema';
import { FromPropertySchemas } from './FromPropertySchemas';
import { RequiredPropOf } from './RequiredPropOf';

export type OnlyRequired<T extends ObjectSchema> =
	T extends ObjectSchemaWithRequired
		? Required<Pick<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;
