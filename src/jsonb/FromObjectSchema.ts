import { ObjectJsonBSchema } from './ObjectJsonBSchema';
import { OnlyRequiredJsonB } from './OnlyRequiredJsonB';
import { OnlyOptionalJsonB } from './OnlyOptionalJsonB';
export type FromObjectJsonBSchema<T extends ObjectJsonBSchema> =
	OnlyRequiredJsonB<T> & OnlyOptionalJsonB<T>;
