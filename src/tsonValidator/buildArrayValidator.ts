import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { Validator } from '../Validator';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';

export function buildArrayValidator(schema: ArrayTsonSchema): Validator {
	const itemValidator = buildValidator(schema.items);

	const validate = (value: unknown): string[] => {
		const errors: string[] = [];

		// Check if value is an array
		if (!Array.isArray(value)) {
			return ['Value must be an array'];
		}

		// Check minLength
		if (schema.minLength !== undefined && value.length < schema.minLength) {
			errors.push(
				`Array length ${value.length} is less than minimum length ${schema.minLength}`,
			);
		}

		// Check maxLength
		if (schema.maxLength !== undefined && value.length > schema.maxLength) {
			errors.push(
				`Array length ${value.length} exceeds maximum length ${schema.maxLength}`,
			);
		}

		// Validate each item
		for (let i = 0; i < value.length; i++) {
			const itemErrors = itemValidator.validate(value[i]);
			if (itemErrors.length > 0) {
				errors.push(`Invalid item at index ${i}: ${itemErrors.join(', ')}`);
			}
		}

		return errors;
	};

	const validateOrThrow = (value: unknown): void => {
		const errors = validate(value);
		if (errors.length > 0) {
			throw new ValidationError(errors.join('; '));
		}
	};

	const isValid = (value: unknown): true | string => {
		const errors = validate(value);
		return errors.length === 0 ? true : errors.join('; ');
	};

	return {
		validate,
		validateOrThrow,
		isValid,
	};
}
