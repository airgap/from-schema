import { ObjectBsonSchema } from './ObjectBsonSchema';
import { OnlyRequiredBson } from './OnlyRequiredBson';
import { OnlyOptionalBson } from './OnlyOptionalBson';
export type FromObjectBsonSchema<T extends ObjectBsonSchema> =
	OnlyRequiredBson<T> & OnlyOptionalBson<T>;
