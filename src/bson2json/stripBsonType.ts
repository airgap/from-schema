import { BsonSchema } from '../bson';

export const stripBsonType = <S extends BsonSchema & { bsonType: string }>(
	s: S,
): Omit<S, 'bsonType'> => {
	const p = { ...s };
	delete (p as BsonSchema & { bsonType?: string }).bsonType;
	return p;
};
