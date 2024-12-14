import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';

export function buildArrayValidator(schema: ArrayTsonSchema) {
	const itemValidator = buildValidator(schema.items);

	return function validateArray(value: unknown): value is unknown[] {
		// Check if value is an array
		if (!Array.isArray(value)) {
			throw new ValidationError('Value must be an array');
		}

		// Check minLength
		if (schema.minLength !== undefined && value.length < schema.minLength) {
			throw new ValidationError(
				`Array length ${value.length} is less than minimum length ${schema.minLength}`,
			);
		}

		// Check maxLength
		if (schema.maxLength !== undefined && value.length > schema.maxLength) {
			throw new ValidationError(
				`Array length ${value.length} exceeds maximum length ${schema.maxLength}`,
			);
		}

		// Validate each item
		for (let i = 0; i < value.length; i++) {
			try {
				itemValidator(value[i]);
			} catch (error) {
				throw new ValidationError(
					`Invalid item at index ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`,
				);
			}
		}

		return true;
	};
}
