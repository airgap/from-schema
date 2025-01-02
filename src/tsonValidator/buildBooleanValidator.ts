import { BooleanTsonSchema } from '../tson/BooleanTsonSchema';
import { Validator } from '../Validator';

export function buildBooleanValidator(schema: BooleanTsonSchema): Validator {
	const hasDefault = schema.default !== undefined;
	const defaultValue: boolean = schema.default as boolean;

	// Fast throwing version
	const throwingBody = `
		if (typeof value === 'boolean') return value;
		if (${hasDefault} && value === undefined) return ${defaultValue};
		throw new Error("Expected boolean, got " + typeof value);
	`;

	// Fast single-error version
	const quickBody = `
		if (typeof value === 'boolean') return true;
		if (${hasDefault} && value === undefined) return true;
		return "Expected boolean, got " + typeof value;
	`;

	// Collecting version
	const collectingBody = `
		const errors = [];
		if (typeof value !== 'boolean') {
			if (!(${hasDefault} && value === undefined)) {
				errors.push("Expected boolean, got " + typeof value);
			}
		}
		return errors;
	`;

	return {
		validate: new Function('value', collectingBody) as (
			value: unknown,
		) => string[],
		validateOrThrow: new Function('value', throwingBody) as (
			value: unknown,
		) => boolean,
		isValid: new Function('value', quickBody) as (
			value: unknown,
		) => true | string,
	};
}
