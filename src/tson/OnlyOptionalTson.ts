import { FromPropertySchemasTson } from './FromPropertySchemasTson';
import { RequiredPropOfTson } from './RequiredPropOfTson';
import {
	ObjectTsonSchema,
	ObjectTsonSchemaWithRequired,
} from './ObjectTsonSchema';

export type OnlyOptionalTson<T extends ObjectTsonSchema> =
	T extends ObjectTsonSchemaWithRequired
		? Partial<Omit<FromPropertySchemasTson<T>, RequiredPropOfTson<T>>>
		: Record<string, never>;
