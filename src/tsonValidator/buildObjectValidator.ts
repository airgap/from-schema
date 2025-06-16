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
		const propKey = `${key}["${k}"]`;
		propertyValidators[k] = buildValidator(propKey, propSchema);

		// For throwing version
		throwValidators += `
			if ("${k}" in ${key}) {
				try {
					${propertyValidators[k].validateOrThrow}
				} catch (error) {
					throw new Error(\`Property "${k}": \${error.message}\`);
				}
			}
		`;

		// For isValid version
		isValidValidators += `
			if ("${k}" in ${key}) {
				const propResult = (() => {
					${propertyValidators[k].isValid}
					return true;
				})();
				if (propResult !== true) {
					return \`Property "${k}": \${propResult}\`;
				}
			}
		`;

		// For collecting version
		collectingValidators += `
			if ("${k}" in ${key}) {
				const propErrors = [];
				{
					let allErrors = propErrors;
					${propertyValidators[k].validate}
				}
				for (const error of propErrors) {
					allErrors.push(\`Property "${k}": \${error}\`);
				}
			}
		`;
	}
	const requiredProps = 'required' in schema ? schema.required : [];

	return {
		validateOrThrow: `
			if (typeof ${key} !== 'object' || ${key} === null || Array.isArray(${key})) {
				throw new Error('Value must be an object');
			}

			for (const prop of ${JSON.stringify(requiredProps)}) {
				if (!(prop in ${key})) {
					throw new Error(\`Missing required property: \${prop}\`);
				}
			}

			${throwValidators}
		`,

		isValid: `
			if (typeof ${key} !== 'object' || ${key} === null || Array.isArray(${key})) {
				return 'Value must be an object';
			}

			for (const prop of ${JSON.stringify(requiredProps)}) {
				if (!(prop in ${key})) {
					return \`Missing required property: \${prop}\`;
				}
			}

			${isValidValidators}`,

		validate: `
			if (typeof ${key} !== 'object' || ${key} === null || Array.isArray(${key})) {
				allErrors.push('Value must be an object');
			} else {
				for (const prop of ${JSON.stringify(requiredProps)}) {
					if (!(prop in ${key})) {
						allErrors.push(\`Missing required property: \${prop}\`);
					}
				}

				${collectingValidators}
			}`,
	};
}
