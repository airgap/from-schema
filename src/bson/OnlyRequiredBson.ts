import {
	ObjectBsonSchema,
	ObjectBsonSchemaWithRequired,
} from './ObjectBsonSchema';
import { FromPropertyBsonSchemas } from './FromPropertyBsonSchemas';
import { RequiredPropOfBson } from './RequiredPropOfBson';

export type OnlyRequiredBson<T extends ObjectBsonSchema> =
	T extends ObjectBsonSchemaWithRequired
		? Required<Pick<FromPropertyBsonSchemas<T>, RequiredPropOfBson<T>>>
		: Record<string, never>;
