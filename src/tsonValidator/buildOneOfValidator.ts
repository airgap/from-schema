import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { buildValidator } from './buildValidator';
import { Validator } from '../Validator';

export function buildOneOfValidator(schema: OneOfTsonSchema): Validator {
	const validators = schema.oneOf.map((subSchema) => buildValidator(subSchema));
	const closureVars: Record<string, any> = {
		validators,
	};

	// Fast throwing version
	const throwingBody = `
        for (const validator of validators) {
            try {
                validator.validateOrThrow(value);
                return; // validation succeeded
            } catch (e) {
                continue; // try next validator
            }
        }
        throw new Error("Value did not match any of the allowed schemas");
    `;

	// Fast single-error version
	const quickBody = `
        for (const validator of validators) {
            const result = validator.isValid(value);
            if (result === true) return true;
        }
        return "Value did not match any of the allowed schemas";
    `;

	// Collecting version
	const collectingBody = `
        const allErrors = [];
        for (const validator of validators) {
            const errors = validator.validate(value);
            if (errors.length === 0) return []; // validation succeeded
            allErrors.push(...errors);
        }
        return ["Value did not match any of the allowed schemas", ...allErrors];
    `;

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
