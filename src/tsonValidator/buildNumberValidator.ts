import { NumberTsonSchema } from '../tson/NumberTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export function buildNumberValidator(
	key: string,
	schema: NumberTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constValue = schema.const;

		// Fast throwing version
		const throwingBody = `
			if (typeof ${key} !== "number") 
				throw new Error("Value must be a number");
			if (${key} !== ${constValue}) throw new Error("Expected ${constValue}, got " + ${key});
			
		`;

		// Fast single-error version
		const quickBody = `
			if (typeof ${key} !== "number") {
				return "Value must be a number";
			}
			if (${key} !== ${constValue}) return "Expected ${constValue}, got " + ${key};
		`;

		// Collecting version
		const collectingBody = `
				if (typeof ${key} !== "number") {
						allErrors.push("Value must be a number");
				}
				else if (${key} !== ${constValue}) allErrors.push("Expected ${constValue}, got " + ${key});
				
		`;

		return {
			validate: collectingBody,
			validateOrThrow: throwingBody,
			isValid: quickBody,
		};
	}

	// Original validation logic for non-const numbers
	const checks: string[] = [];

	if (schema.minimum !== undefined) {
		checks.push(
			`if (${key} < ${schema.minimum}) return "Value must be greater than or equal to ${schema.minimum}";`,
		);
	}

	if (schema.maximum !== undefined) {
		checks.push(
			`if (${key} > ${schema.maximum}) return "Value must be less than or equal to ${schema.maximum}";`,
		);
	}

	const typeCheck = `
		if (typeof ${key} !== "number") {
				return "Value must be a number";
		}
		
		${
			schema.type === 'integer'
				? `if (!Number.isInteger(${key})) {
				return "Value must be an integer";
			}`
				: ''
		}
	`;

	// Fast throwing version
	const throwingBody = `
			${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n            ')}
		
	`;

	// Fast single-error version
	const quickBody = `
		${typeCheck}
		${checks.join('\n            ')}
	`;

	// Collecting version
	const collectingBody = `
		if (typeof ${key} !== "number") {
			allErrors.push("Value must be a number");
		}
		
			${
				schema.type === 'integer'
					? `else if (!Number.isInteger(${key})) {
					allErrors.push("Value must be an integer");
				}`
					: ''
			}
			${checks.reduce((acc, check) => acc + ' else ' + check.replace(/return "(.*?)";/, 'allErrors.push("$1");').replace(/;$/, ';'), '')}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
