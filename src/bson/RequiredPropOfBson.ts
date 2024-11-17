import { ObjectBsonSchemaWithRequired } from './ObjectBsonSchema';
export type RequiredPropOfBson<T extends ObjectBsonSchemaWithRequired> =
	Extract<keyof T['properties'], T['required'][number]>;
