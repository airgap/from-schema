import { BsonSchema } from '../bson';

export const stripBsonType = <S extends BsonSchema & { bsonType: string }>(
	s: S,
): Omit<S, 'bsonType'> => {
	delete (s as BsonSchema & { bsonType?: string }).bsonType;
	return s;
};
