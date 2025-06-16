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
			let numValue = ${key};
			if (typeof ${key} === "string") {
				numValue = Number(${key});
				if (isNaN(numValue)) {
					throw new Error("Value must be a valid number");
				}
			} else if (typeof ${key} !== "number") {
				throw new Error("Value must be a number");
			}
			if (numValue !== ${constValue}) throw new Error("Expected ${constValue}, got " + numValue);
			
		`;

		// Fast single-error version
		const quickBody = `
			let numValue = ${key};
			if (typeof ${key} === "string") {
				numValue = Number(${key});
				if (isNaN(numValue)) {
					return "Value must be a valid number";
				}
			} else if (typeof ${key} !== "number") {
				return "Value must be a number";
			}
			if (numValue !== ${constValue}) return "Expected ${constValue}, got " + numValue;
		`;

		// Collecting version
		const collectingBody = `
			let numValue = ${key};
			if (typeof ${key} === "string") {
				numValue = Number(${key});
				if (isNaN(numValue)) {
					allErrors.push("Value must be a valid number");
				} else if (numValue !== ${constValue}) {
					allErrors.push("Expected ${constValue}, got " + numValue);
				}
			} else if (typeof ${key} !== "number") {
				allErrors.push("Value must be a number");
			} else if (numValue !== ${constValue}) {
				allErrors.push("Expected ${constValue}, got " + numValue);
			}
				
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
			`if (numValue < ${schema.minimum}) return "Value must be greater than or equal to ${schema.minimum}";`,
		);
	}

	if (schema.maximum !== undefined) {
		checks.push(
			`if (numValue > ${schema.maximum}) return "Value must be less than or equal to ${schema.maximum}";`,
		);
	}

	const typeCheck = `
		let numValue = ${key};
		if (typeof ${key} === "string") {
			numValue = Number(${key});
			if (isNaN(numValue)) {
				return "Value must be a valid number";
			}
		} else if (typeof ${key} !== "number") {
			return "Value must be a number";
		}
		
		${
			schema.type === 'integer'
				? `if (!Number.isInteger(numValue)) {
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
		let numValue = ${key};
		if (typeof ${key} === "string") {
			numValue = Number(${key});
			if (isNaN(numValue)) {
				allErrors.push("Value must be a valid number");
			} else {
				${
					schema.type === 'integer'
						? `if (!Number.isInteger(numValue)) {
						allErrors.push("Value must be an integer");
					} else {`
						: ''
				}
				${checks
					.map((check) => {
						const modifiedCheck = check.replace(
							/return "(.*?)";/,
							'allErrors.push("$1");',
						);
						return modifiedCheck;
					})
					.join(' else ')}
				${schema.type === 'integer' ? '}' : ''}
			}
		} else if (typeof ${key} !== "number") {
			allErrors.push("Value must be a number");
		} else {
			${
				schema.type === 'integer'
					? `if (!Number.isInteger(${key})) {
					allErrors.push("Value must be an integer");
				} else {`
					: ''
			}
			${checks
				.map((check) => {
					const modifiedCheck = check
						.replace(/numValue/g, key)
						.replace(/return "(.*?)";/, 'allErrors.push("$1");');
					return modifiedCheck;
				})
				.join(' else ')}
			${schema.type === 'integer' ? '}' : ''}
		}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
