import { DateTsonSchema } from '../tson/DateTsonSchema';
import { ProtoValidator } from '../ProtoValidator';

export const buildDateValidator = (schema: DateTsonSchema): ProtoValidator => {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constTime = schema.const.getTime();

		return {
			validateOrThrow: `(value: unknown) => {
				if (!(value instanceof Date)) {
					throw new Error("Value must be a Date");
				}
				if (isNaN(value.getTime())) throw new Error("Value must be a valid Date");
				if (value.getTime() !== ${constTime}) throw new Error('Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString());
			}`,

			isValid: `(value: unknown) => {
				if (!(value instanceof Date)) {
					return "Value must be a Date";
				}
				if (isNaN(value.getTime())) return "Value must be a valid Date";
				if (value.getTime() !== ${constTime}) return 'Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString();
				return true;
			}`,

			validate: `(value: unknown) => {
				const errors = [];
				if (!(value instanceof Date)) {
					errors.push("Value must be a Date");
					return errors;
				}
				if (isNaN(value.getTime())) {
					errors.push("Value must be a valid Date");
					return errors;
				}
				if (value.getTime() !== ${constTime}) errors.push('Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString());
				return errors;
			}`,
		};
	}

	const checks: string[] = [];

	// Handle minimum
	if ('minimum' in schema && schema.minimum !== undefined) {
		const minTime = schema.minimum.getTime();
		checks.push(
			`if (value.getTime() < ${minTime}) return 'Date must be greater than or equal to ' + new Date(${minTime}).toISOString();`,
		);
	}

	// Handle maximum
	if ('maximum' in schema && schema.maximum !== undefined) {
		const maxTime = schema.maximum.getTime();
		checks.push(
			`if (value.getTime() > ${maxTime}) return 'Date must be less than or equal to ' + new Date(${maxTime}).toISOString();`,
		);
	}

	// Type check
	const typeCheck = `
		if (!(value instanceof Date)) {
			return "Value must be a Date";
		}
		if (isNaN(value.getTime())) return "Value must be a valid Date";
	`;

	return {
		validateOrThrow: `(value: unknown) => {
			${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
			${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n			')}
		}`,

		isValid: `(value: unknown) => {
			${typeCheck}
			${checks.join('\n			')}
			return true;
		}`,

		validate: `(value: unknown) => {
			const errors = [];
			if (!(value instanceof Date)) {
				errors.push("Value must be a Date");
				return errors;
			}
			if (isNaN(value.getTime())) {
				errors.push("Value must be a valid Date");
				return errors;
			}
			${checks.map((check) => check.replace(/return "(.*?)";/, 'errors.push("$1");')).join('\n			')}
			return errors;
		}`,
	};
};
