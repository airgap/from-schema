import { SchemaBase } from '../generic';

type DateBase = SchemaBase & {
	readonly type: 'date';
};
type VariableDate = DateBase & {
	readonly minimum?: Date;
	readonly maximum?: Date;
};
type ConstantDate = DateBase & {
	readonly const: Date;
};
export type DateTsonSchema = SchemaBase & (VariableDate | ConstantDate);
