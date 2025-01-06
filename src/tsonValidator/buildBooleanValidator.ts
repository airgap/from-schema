import { BooleanTsonSchema } from '../tson/BooleanTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildBooleanValidator(
	schema: BooleanTsonSchema,
): ProtoValidator {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		return {
			validateOrThrow: `(value: unknown): void => {
				if (typeof value !== 'boolean') throw new Error("Expected boolean, got " + typeof value);
				if (value !== ${constValue}) throw new Error("Expected ${constValue}, got " + value);
			}`,

			isValid: `(value: unknown): true | string => {
				if (typeof value !== 'boolean') return "Expected boolean, got " + typeof value;
				if (value !== ${constValue}) return "Expected ${constValue}, got " + value;
				return true;
			}`,

			validate: `(value: unknown): string[] => {
				const errors = [];
				if (typeof value !== 'boolean') errors.push("Expected boolean, got " + typeof value);
				if (value !== ${constValue}) errors.push("Expected ${constValue}, got " + value);
				return errors;
			}`,
		};
	}

	// Handle non-const validation with default value support
	const hasDefault = schema.default !== undefined;
	const defaultValue = schema.default as boolean;

	return {
		validateOrThrow: `(value: unknown): void => {
			if (typeof value === 'boolean') return value;
			if (${hasDefault} && value === undefined) return ${defaultValue};
			throw new Error("Expected boolean, got " + typeof value);
		}`,

		isValid: `(value: unknown): true | string => {
			if (typeof value === 'boolean') return true;
			if (${hasDefault} && value === undefined) return true;
			return "Expected boolean, got " + typeof value;
		}`,

		validate: `(value: unknown): string[] => {
			const errors = [];
			if (typeof value !== 'boolean') {
				if (!(${hasDefault} && value === undefined)) {
					errors.push("Expected boolean, got " + typeof value);
				}
			}
			return errors;
		}`,
	};
}
