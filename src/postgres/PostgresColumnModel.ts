import { FromJsonSchema } from '../json';
import * as columns from './columns';

export type PostgresColumnModel =
	| columns.ArrayColumnModel
	| columns.BigIntColumnModel
	| columns.BigSerialColumnModel
	| columns.BooleanColumnModel
	| columns.ByteaColumnModel
	| columns.CharColumnModel
	| columns.DateColumnModel
	| columns.DoubleColumnModel
	| columns.EnumColumnModel
	| columns.IntegerColumnModel
	| columns.MoneyColumnModel
	| columns.NumericColumnModel
	| columns.PointColumnModel
	| columns.RealColumnModel
	| columns.SmallIntColumnModel
	| columns.SmallSerialColumnModel
	| columns.SerialColumnModel
	| columns.TextColumnModel
	| columns.TimeColumnModel
	| columns.Timestamp
	| columns.Timestamptz
	| columns.TimeColumnModel
	| columns.DateColumnModel
	| columns.VarcharColumnModel
	| columns.JsonbColumnModel;

export type FromPostgresColumnModel<S extends PostgresColumnModel> =
	S extends columns.ArrayColumnModel
		? FromPostgresColumnModel<S>
		: S extends columns.BigIntColumnModel
			? bigint
			: S extends columns.BigSerialColumnModel
				? bigint
				: S extends columns.BooleanColumnModel
					? boolean
					: S extends columns.ByteaColumnModel
						? Buffer
						: S extends columns.CharColumnModel
							? string
							: S extends columns.DateColumnModel
								? Date
								: S extends columns.DoubleColumnModel
									? number
									: S extends columns.EnumColumnModel
										? string
										: S extends columns.IntegerColumnModel
											? number
											: S extends columns.MoneyColumnModel
												? number
												: S extends columns.NumericColumnModel
													? number
													: S extends columns.RealColumnModel
														? number
														: S extends columns.SmallIntColumnModel
															? number
															: S extends columns.SmallSerialColumnModel
																? number
																: S extends columns.SerialColumnModel
																	? number
																	: S extends columns.TextColumnModel
																		? string
																		: S extends columns.TimeColumnModel
																			? Date
																			: S extends columns.Timestamp
																				? Date
																				: S extends columns.Timestamptz
																					? Date
																					: S extends columns.VarcharColumnModel
																						? string
																						: S extends columns.JsonbColumnModel
																							? FromJsonSchema<S>
																							: never;
