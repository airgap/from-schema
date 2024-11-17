import {
	ObjectBsonSchema,
	ObjectBsonSchemaWithRequired,
} from './ObjectBsonSchema';
import { FromPropertyBsonSchemas } from './FromPropertyBsonSchemas';
import { RequiredPropOfBson } from './RequiredPropOfBson';

export type OnlyOptionalBson<T extends ObjectBsonSchema> =
	T extends ObjectBsonSchemaWithRequired
		? Partial<Omit<FromPropertyBsonSchemas<T>, RequiredPropOfBson<T>>>
		: Record<string, never>;
