import { ObjectSchemaWithRequired } from './ObjectSchema';
export type RequiredPropOf<T extends ObjectSchemaWithRequired> = Extract<
	keyof T['properties'],
	T['required'][number]
>;
