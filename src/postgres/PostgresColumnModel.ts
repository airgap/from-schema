import * as columns from './columns';

export type PostgresColumnModel =
	| columns.BigIntColumnModel
	| columns.BigSerialColumnModel
	| columns.BooleanColumnModel
	| columns.ByteaColumnModel
	| columns.CharColumnModel
	| columns.DateColumnModel
	| columns.DecimalColumnModel
	| columns.DoubleColumnModel
	| columns.IntegerColumnModel
	| columns.MoneyColumnModel
	| columns.NumericColumnModel
	| columns.RealColumnModel
	| columns.SmallIntColumnModel
	| columns.SmallSerialColumnModel
	| columns.SerialColumnModel
	| columns.TextColumnModel
	| columns.TimeColumnModel
	| columns.TimestampColumnModel
	| columns.VarcharColumnModel
	| columns.EnumColumnModel;
