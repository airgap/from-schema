import { DateTsonSchema } from '../tson/DateTsonSchema';
import { Validator } from '../Validator';

export const buildDateValidator = (schema: DateTsonSchema): Validator => {
	// If const is set, only validate against that value
	if ('const' in schema) {
		const constTime = schema.const.getTime();

		// Fast throwing version
		const throwingBody = `
            if (!(value instanceof Date)) {
                if (typeof value === "string") {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        value = date;
                    } else {
                        throw new Error("Value must be a valid Date");
                    }
                } else {
                    throw new Error("Value must be a Date");
                }
            }
            if (isNaN(value.getTime())) throw new Error("Value must be a valid Date");
            if (value.getTime() !== ${constTime}) throw new Error('Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString());
        `;

		// Fast single-error version
		const quickBody = `
            if (!(value instanceof Date)) {
                if (typeof value === "string") {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        value = date;
                    } else {
                        return "Value must be a valid Date";
                    }
                } else {
                    return "Value must be a Date";
                }
            }
            if (isNaN(value.getTime())) return "Value must be a valid Date";
            if (value.getTime() !== ${constTime}) return 'Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString();
            return true;
        `;

		// Collecting version
		const collectingBody = `
            const errors = [];
            if (!(value instanceof Date)) {
                if (typeof value === "string") {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        value = date;
                    } else {
                        errors.push("Value must be a valid Date");
                        return errors;
                    }
                } else {
                    errors.push("Value must be a Date");
                    return errors;
                }
            }
            if (isNaN(value.getTime())) {
                errors.push("Value must be a valid Date");
                return errors;
            }
            if (value.getTime() !== ${constTime}) errors.push('Expected ' + new Date(${constTime}).toISOString() + ', got ' + value.toISOString());
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
            if (typeof value === "string") {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    value = date;
                } else {
                    return "Value must be a valid Date";
                }
            } else {
                return "Value must be a Date";
            }
        }
        if (isNaN(value.getTime())) return "Value must be a valid Date";
    `;

	// Fast throwing version
	const throwingBody = `
        ${typeCheck.replace(/return "(.*?)";/g, 'throw new Error("$1");')}
        ${checks.map((check) => check.replace(/return "(.*?)";/g, 'throw new Error("$1");')).join('\n        ')}
    `;

	// Fast single-error version
	const quickBody = `
        ${typeCheck}
        ${checks.join('\n        ')}
        return true;
    `;

	// Collecting version
	const collectingBody = `
        const errors = [];
        if (!(value instanceof Date)) {
            if (typeof value === "string") {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    value = date;
                } else {
                    errors.push("Value must be a valid Date");
                    return errors;
                }
            } else {
                errors.push("Value must be a Date");
                return errors;
            }
        }
        if (isNaN(value.getTime())) {
            errors.push("Value must be a valid Date");
            return errors;
        }
        ${checks.map((check) => check.replace(/return "(.*?)";/, 'errors.push("$1");')).join('\n        ')}
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
};
