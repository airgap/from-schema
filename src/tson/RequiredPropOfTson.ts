import { ObjectTsonSchemaWithRequired } from './ObjectTsonSchema';
export type RequiredPropOfTson<T extends ObjectTsonSchemaWithRequired> =
	Extract<keyof T['properties'], T['required'][number]>;
