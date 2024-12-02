import { ObjectJsonBSchemaWithRequired } from './ObjectJsonBSchema';
export type RequiredPropOfJsonB<T extends ObjectJsonBSchemaWithRequired> =
	Extract<keyof T['properties'], T['required'][number]>;
