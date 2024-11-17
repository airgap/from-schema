import { ObjectJsonSchema } from './ObjectJsonSchema';
import { OnlyRequired } from './OnlyRequiredJson';
import { OnlyOptional } from './OnlyOptionalJson';
export type FromObjectJsonSchema<T extends ObjectJsonSchema> = OnlyRequired<T> &
	OnlyOptional<T>;
