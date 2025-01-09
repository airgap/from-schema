import { DateTsonSchema } from '../tson/DateTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export const buildDateValidator = (
	key: string,
	schema: DateTsonSchema,
): ProtoValidator => {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constTime = schema.const.getTime();

		return {
			validateOrThrow: `
				if (!(${key} instanceof Date)) {
					throw new Error("Value must be a Date");
				}
				if (isNaN(${key}.getTime())) throw new Error("Value must be a valid Date");
				if (${key}.getTime() !== ${constTime}) throw new Error('Expected ' + new Date(${constTime}).toISOString() + ', got ' + ${key}.toISOString());
			`,

			isValid: `
				if (!(${key} instanceof Date)) {
					return "Value must be a Date";
				}
				if (isNaN(value.getTime())) return "Value must be a valid Date";
				if (${key}.getTime() !== ${constTime}) return 'Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString();
				`,

			validate: `
				if (!(${key} instanceof Date)) {
					allErrors.push("Value must be a Date");
				}
				if (isNaN(value.getTime())) {
					allErrors.push("Value must be a valid Date");
				}
				if (${key}.getTime() !== ${constTime}) allErrors.push('Expected ' + new Date(${constTime}).toISOString() + ', got ' + ${key}.toISOString());
			`,
		};
	}

	const checks: string[] = [];

	// Handle minimum
	if ('minimum' in schema && schema.minimum !== undefined) {
		const minTime = schema.minimum.getTime();
		checks.push(
			`if (${key}.getTime() < ${minTime}) return 'Date must be greater than or equal to ' + new Date(${minTime}).toISOString();`,
		);
	}

	// Handle maximum
	if ('maximum' in schema && schema.maximum !== undefined) {
		const maxTime = schema.maximum.getTime();
		checks.push(
			`if (${key}.getTime() > ${maxTime}) return 'Date must be less than or equal to ' + new Date(${maxTime}).toISOString();`,
		);
	}

	// Type check
	const typeCheck = `
		if (!(${key} instanceof Date)) {
			return "Value must be a Date";
		}
		if (isNaN(${key}.getTime())) return "Value must be a valid Date";
	`;

	return {
		validateOrThrow: `
			${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n			')}
		`,

		isValid: `
			${typeCheck}
			${checks.join('\n			')}
		`,

		validate: `
			if (!(${key} instanceof Date)) {
				allErrors.push("Value must be a Date");
			}
			else if (isNaN(${key}.getTime())) {
				allErrors.push("Value must be a valid Date");
			}
			${checks.map((check) => check.replace(/return "(.*?)";/, 'allErrors.push("$1");')).join('\n			')}
		`,
	};
};
