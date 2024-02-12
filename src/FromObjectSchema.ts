import { ObjectSchema } from './ObjectSchema';
import { OnlyRequired } from './OnlyRequired';
import { OnlyOptional } from './OnlyOptional';
export type FromObjectSchema<T extends ObjectSchema> = OnlyRequired<T> &
	OnlyOptional<T>;
