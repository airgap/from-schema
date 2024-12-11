import { SchemaBase } from '../../../generic';

export type TextColumnModel = SchemaBase & {
	readonly type: 'text';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
};
