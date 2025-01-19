import { isObject } from '../isObject';
import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';
import { TsonSchema } from '../tson/TsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';

export function buildObjectValidator(
	key: string,
	schema: ObjectTsonSchema,
): ProtoValidator {
	const propertyValidators: Record<string, ProtoValidator> = {};
	let throwValidators = '';
	let isValidValidators = '';
	let collectingValidators = '';

	// Build validators for each property
	for (const [k, propSchema] of Object.entries(schema.properties || {})) {
		propertyValidators[k] = buildValidator(`${key}["${k}"]`, propSchema);
		throwValidators += `${propertyValidators[k].validateOrThrow};`;
		isValidValidators += `${propertyValidators[k].isValid};`;
		collectingValidators += `${propertyValidators[k].validate};`;
	}
	const requiredProps = 'required' in schema ? schema.required : [];

	return {
		validateOrThrow: `
			if (!isObject(${key})) {
				throw new Error('Value must be an object');
			}

			for (const prop of ${JSON.stringify(requiredProps)} as const) {
				if (!(prop in ${key})) {
					throw new Error(\`Missing required property: \${prop}\`);
				}
			}

			${throwValidators}
		`,

		isValid: `
			if (!isObject(${key})) {
				return 'Value must be an object';
			}

			for (const prop of ${JSON.stringify(requiredProps)} as const) {
				if (!(prop in ${key})) {
					return \`Missing required property: \${prop}\`;
				}
			}

			${isValidValidators}`,

		validate: `

			if (!isObject(${key})) {
				allErrors.push('Value must be an object');
			} else
{
			for (const prop of ${JSON.stringify(requiredProps)} as const) {
				if (!(prop in ${key})) {
					allErrors.push(\`Missing required property: \${prop}\`);
				}
			}

			${collectingValidators}}`,
	};
}
