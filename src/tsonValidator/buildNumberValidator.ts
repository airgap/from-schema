import { NumberTsonSchema } from '../tson/NumberTsonSchema';
import { Validator } from '../Validator';

export function buildNumberValidator(schema: NumberTsonSchema): Validator {
	const checks: string[] = [];

	if (schema.minimum !== undefined) {
		checks.push(
			`if (value < ${schema.minimum}) return "Value must be greater than or equal to ${schema.minimum}";`,
		);
	}

	if (schema.maximum !== undefined) {
		checks.push(
			`if (value > ${schema.maximum}) return "Value must be less than or equal to ${schema.maximum}";`,
		);
	}

	const typeCheck = `
		if (typeof value !== "number") {
			if (typeof value === "string") {
				const num = Number(value);
				if (!Number.isNaN(num)) {
					value = num;
				} else {
					return "Value must be a valid number";
				}
			} else {
				return "Value must be a number";
			}
		}
		
		${
			schema.type === 'integer'
				? `
		if (!Number.isInteger(value)) {
			return "Value must be an integer";
		}
		`
				: ''
		}
	`;

	// Fast throwing version
	const throwingBody = `
		${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
		${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n		')}
	`;

	// Fast single-error version
	const quickBody = `
		${typeCheck}
		${checks.join('\n		')}
		return true;
	`;

	// Collecting version
	const collectingBody = `
		const errors = [];
		${typeCheck.replace(/return "(.*?)";/g, 'errors.push("$1");')}
		${checks.map((check) => check.replace(/return "(.*?)";/, 'errors.push("$1");')).join('\n		')}
		return errors;
	`;

	return {
		validate: new Function('value', collectingBody) as (
			value: unknown,
		) => string[],
		validateOrThrow: new Function('value', throwingBody) as (
			value: unknown,
		) => void,
		isValid: new Function('value', quickBody) as (
			value: unknown,
		) => true | string,
	};
}
