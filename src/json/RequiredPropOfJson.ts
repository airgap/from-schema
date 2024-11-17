import { ObjectJsonSchemaWithRequired } from './ObjectJsonSchema';
export type RequiredPropOf<T extends ObjectJsonSchemaWithRequired> = Extract<
	keyof T['properties'],
	T['required'][number]
>;
