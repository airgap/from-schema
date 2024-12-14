import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';
import { ValidationError } from './ValidationError';

export function buildObjectValidator(schema: ObjectTsonSchema) {
	return function validateObject(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			throw new ValidationError('Value must be an object');
		}
		// Basic implementation - expand as needed
		return true;
	};
}
