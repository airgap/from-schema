import { BooleanTsonSchema } from '../tson/BooleanTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildBooleanValidator(
	key: string,
	schema: BooleanTsonSchema,
): ProtoValidator {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		return {
			validateOrThrow: `
				if (typeof ${key} !== 'boolean') throw new Error("Expected boolean, got " + typeof ${key});
				if (${key} !== ${constValue}) throw new Error("Expected ${constValue}, got " + ${key});
			`,

			isValid: `
				if (typeof ${key} !== 'boolean') return "Expected boolean, got " + typeof ${key};
				if (${key} !== ${constValue}) return "Expected ${constValue}, got " + ${key};
				
			`,

			validate: `
				if (typeof ${key} !== 'boolean') allErrors.push("Expected boolean, got " + typeof ${key});
				else if (${key} !== ${constValue}) allErrors.push("Expected ${constValue}, got " + ${key});
			`,
		};
	}

	// Handle non-const validation with default value support
	const hasDefault = schema.default !== undefined;
	const defaultValue = schema.default as boolean;

	return {
		validateOrThrow: `
		${hasDefault ? `if (typeof ${key} === 'undefined') return ${JSON.stringify(defaultValue)};` : ''}
		if(typeof ${key} !== 'boolean') throw new Error("Expected boolean, got " + typeof ${key});
		return ${key};
		`,

		isValid: `
		${hasDefault ? `if (typeof ${key} === 'undefined') {} else` : ''}
			if (typeof ${key} !== 'boolean')
			return "Expected boolean, got " + typeof ${key};
		`,

		validate: `
		${hasDefault ? `if (typeof ${key} === 'undefined') {} else` : ''}
			if (typeof ${key} !== 'boolean') {
				allErrors.push("Expected boolean, got " + typeof ${key});
			}
		`,
	};
}
