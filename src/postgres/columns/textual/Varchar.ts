import { SchemaBase } from '../../../generic';

export type VarcharColumnModel = SchemaBase & {
	readonly type: 'varchar' | 'character varying';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
};
