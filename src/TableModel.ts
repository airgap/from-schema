import { FromObjectSchema } from './FromObjectSchema';
import { ObjectSchema } from './ObjectSchema';

export type TableModel<S extends ObjectSchema> = {
	readonly schema: S;
	readonly indexes?: readonly (
		| keyof S['properties']
		| { bond: readonly (keyof S['properties'])[] }
	)[];
	readonly docs?: FromObjectSchema<S>[];
};
