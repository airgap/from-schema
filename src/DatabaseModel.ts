import { TableModel } from './TableModel';
import { ObjectBsonSchema } from './bson';

export type DatabaseModel<
	T extends Record<string, TableModel<ObjectBsonSchema>>,
> = {
	type: 'database';
	tables: T;
};
