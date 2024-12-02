import { SchemaBase } from '../../generic';

export type VarcharColumnModel = SchemaBase & {
	type: 'varchar' | 'character varying';
	length?: number;
};
