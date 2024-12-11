import { ObjectTsonSchema } from './ObjectTsonSchema';
import { OnlyRequiredTson } from './OnlyRequiredTson';
import { OnlyOptionalTson } from './OnlyOptionalTson';
export type FromObjectTsonSchema<T extends ObjectTsonSchema> =
	OnlyRequiredTson<T> & OnlyOptionalTson<T>;
