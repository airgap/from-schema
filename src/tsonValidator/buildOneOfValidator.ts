import { OneOfTsonSchema } from '../tson/OneOfTsonSchema';
import { buildValidator } from './buildValidator';

export function buildOneOfValidator(schema: OneOfTsonSchema) {
	const validators = schema.oneOf.map((subSchema) => buildValidator(subSchema));
	const closureVars: Record<string, any> = {
		validators,
	};

	const functionBody = `
        for (const validator of validators) {
            try {
                validator(value);
                return undefined; // validation succeeded
            } catch (e) {
                continue; // try next validator
            }
        }
        return "Value did not match any of the allowed schemas";
    `;

	return new Function(
		...Object.keys(closureVars),
		`return function validate(value) { ${functionBody} }`,
	)(...Object.values(closureVars)) as (value: unknown) => string | undefined;
}
