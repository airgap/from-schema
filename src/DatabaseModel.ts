import { TableModel } from './TableModel';
import { ObjectSchema } from './ObjectSchema';

export type DatabaseModel<T extends Record<string, TableModel<ObjectSchema>>> =
	{
		type: 'database';
		tables: T;
	};
