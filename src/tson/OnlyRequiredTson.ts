import {
	ObjectTsonSchema,
	ObjectTsonSchemaWithRequired,
} from './ObjectTsonSchema';
import { FromPropertySchemasTson } from './FromPropertySchemasTson';
import { RequiredPropOfTson } from './RequiredPropOfTson';

export type OnlyRequiredTson<T extends ObjectTsonSchema> =
	T extends ObjectTsonSchemaWithRequired
		? Required<Pick<FromPropertySchemasTson<T>, RequiredPropOfTson<T>>>
		: Record<string, never>;
