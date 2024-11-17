import { NumberBsonSchema } from './NumberBsonSchema';

export type NaturalNumberBsonSchema = {
	bsonType: 'long';
	minimum: 1;
};
