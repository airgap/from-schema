import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';
import { TsonSchema } from '../tson/TsonSchema';
import { Validator } from '../Validator';
import { buildValidator } from './buildValidator';

export function buildObjectValidator(schema: ObjectTsonSchema): Validator {
	const propertyValidators: Record<string, Validator> = {};

	// Build validators for each property
	for (const [key, propSchema] of Object.entries(schema.properties || {})) {
		propertyValidators[key] = buildValidator(propSchema);
	}

	const requiredProps = 'required' in schema ? schema.required : [];

	// Fast throwing version
	const validateOrThrow = (value: unknown) => {
		if (!isObject(value)) {
			throw new Error('Value must be an object');
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				throw new Error(`Missing required property: ${prop}`);
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				try {
					validator.validateOrThrow((value as Record<string, unknown>)[key]);
				} catch (error) {
					throw new Error(`Property "${key}": ${(error as Error).message}`);
				}
			}
		}
	};

	// Fast single-error version
	const isValid = (value: unknown): true | string => {
		if (!isObject(value)) {
			return 'Value must be an object';
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				return `Missing required property: ${prop}`;
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				const result = validator.isValid(
					(value as Record<string, unknown>)[key],
				);
				if (result !== true) {
					return `Property "${key}": ${result}`;
				}
			}
		}

		return true;
	};

	// Collecting version
	const validate = (value: unknown): string[] => {
		const errors = [];

		if (!isObject(value)) {
			return ['Value must be an object'];
		}

		// Check required properties
		for (const prop of requiredProps) {
			if (!(prop in value)) {
				errors.push(`Missing required property: ${prop}`);
			}
		}

		// Validate each property
		for (const [key, validator] of Object.entries(propertyValidators)) {
			if (key in value) {
				const propErrors = validator.validate(
					(value as Record<string, unknown>)[key],
				);
				for (const error of propErrors) {
					errors.push(`Property "${key}": ${error}`);
				}
			}
		}

		return errors;
	};

	return {
		validate,
		validateOrThrow,
		isValid,
	};
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
