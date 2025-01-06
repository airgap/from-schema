import { isObject } from '../isObject';
import { ObjectTsonSchema } from '../tson/ObjectTsonSchema';
import { TsonSchema } from '../tson/TsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';

export function buildObjectValidator(schema: ObjectTsonSchema): ProtoValidator {
	const propertyValidators: Record<string, ProtoValidator> = {};
	let throwValidators = '';
	let isValidValidators = '';
	let collectingValidators = '';

	// Build validators for each property
	for (const [key, propSchema] of Object.entries(schema.properties || {})) {
		propertyValidators[key] = buildValidator(propSchema);
		throwValidators += `[${JSON.stringify(key)}, ${propertyValidators[key].validateOrThrow}],`;
		isValidValidators += `[${JSON.stringify(key)}, ${propertyValidators[key].isValid}],`;
		collectingValidators += `[${JSON.stringify(key)}, ${propertyValidators[key].validate}],`;
	}

	const requiredProps = 'required' in schema ? schema.required : [];

	return {
		validateOrThrow: `(value: unknown) => {
			if (!isObject(value)) {
				throw new Error('Value must be an object');
			}

			for (const prop of ${JSON.stringify(requiredProps)}) {
				if (!(prop in value)) {
					throw new Error(\`Missing required property: \${prop}\`);
				}
			}

			for (const [key, validator] of [${throwValidators}]) {
				if (key in value) {
					try {
						validator.validateOrThrow(value[key]);
					} catch (error) {
						throw new Error(\`Property "\${key}": \${error.message}\`);
					}
				}
			}
		}`,

		isValid: `(value: unknown) => {
			if (!isObject(value)) {
				return 'Value must be an object';
			}

			for (const prop of ${JSON.stringify(requiredProps)}) {
				if (!(prop in value)) {
					return \`Missing required property: \${prop}\`;
				}
			}

			for (const [key, validator] of [${isValidValidators}]) {
				if (key in value) {
					const result = validator.isValid(value[key]);
					if (result !== true) {
						return \`Property "\${key}": \${result}\`;
					}
				}
			}

			return true;
		}`,

		validate: `(value: unknown) => {
			const errors = [];

			if (!isObject(value)) {
				return ['Value must be an object'];
			}

			for (const prop of ${JSON.stringify(requiredProps)}) {
				if (!(prop in value)) {
					errors.push(\`Missing required property: \${prop}\`);
				}
			}

			for (const [key, validator] of [${collectingValidators}]) {
				if (key in value) {
					const propErrors = validator.validate(value[key]);
					for (const error of propErrors) {
						errors.push(\`Property "\${key}": \${error}\`);
					}
				}
			}

			return errors;
		}`,
	};
}
