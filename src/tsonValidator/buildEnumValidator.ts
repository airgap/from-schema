import { EnumTsonSchema } from '../tson/EnumTsonSchema';

export function buildEnumValidator(schema: EnumTsonSchema) {
	const enumLookup = Object.fromEntries(
		schema.enum.map((value) => [value, true]),
	);
	const closureVars: Record<string, any> = {
		enumLookup,
		enumValues: schema.enum,
	};

	// Fast throwing version
	const throwingBody = `
        if (!enumLookup[value]) {
            throw new Error("Value must be one of: " + enumValues.join(", "));
        }
    `;

	// Fast single-error version
	const quickBody = `
        if (!enumLookup[value]) {
            return "Value must be one of: " + enumValues.join(", ");
        }
        return true;
    `;

	// Collecting version
	const collectingBody = `
        const errors = [];
        if (!enumLookup[value]) {
            errors.push("Value must be one of: " + enumValues.join(", "));
        }
        return errors;
    `;

	if (Object.keys(closureVars).length > 0) {
		return {
			validate: new Function(
				...Object.keys(closureVars),
				`return function validate(value) { ${collectingBody} }`,
			)(...Object.values(closureVars)) as (value: unknown) => string[],
			validateOrThrow: new Function(
				...Object.keys(closureVars),
				`return function validate(value) { ${throwingBody} }`,
			)(...Object.values(closureVars)) as (value: unknown) => void,
			isValid: new Function(
				...Object.keys(closureVars),
				`return function validate(value) { ${quickBody} }`,
			)(...Object.values(closureVars)) as (value: unknown) => true | string,
		};
	}

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
