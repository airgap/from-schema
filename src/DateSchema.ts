export type JsonDate = {
	readonly type: 'string';
	readonly format: 'date-time';
	readonly minimum?: string;
	readonly maximum?: string;
};
export type BsonDate = {
	readonly bsonType: 'date';
	readonly minimum?: Date;
	readonly maximum?: Date;
};
export type DateSchema = JsonDate | BsonDate;
