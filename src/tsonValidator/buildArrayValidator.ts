import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';
import { alpha } from '../alpha';

export function buildArrayValidator(
	key: string,
	schema: ArrayTsonSchema,
): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const itemKey = alpha(key) + '_item';
	const itemValidator = buildValidator(itemKey, schema.items);

	// Collecting version
	const collectingBody = `
			if (!Array.isArray(${key})) {
				allErrors.push('Value must be an array');
			} else {
			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				allErrors.push(\`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}
			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				allErrors.push(\`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}
			for (let i = 0; i < ${key}.length; i++) {
				const ${itemKey} = ${key}[i];
				const itemErrors = [];
				{
					let allErrors = itemErrors;
					${itemValidator.validate}
				}
				for (const error of itemErrors) {
					allErrors.push(\`Invalid item at index \${i}: \${error}\`);
				}
			}
		}
	`;

	// Fast throwing version
	const throwingBody = `

			if (!Array.isArray(${key})) {
				throw new Error('Value must be an array');
			}

			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				throw new Error(\`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				throw new Error(\`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}

			for (let i = 0; i < ${key}.length; i++) {
				const ${itemKey} = ${key}[i];
				try {
					${itemValidator.validateOrThrow}
				} catch (error) {
					throw new Error(\`Invalid item at index \${i}: \${error.message}\`);
				}
			}
	`;

	// Fast single-error version
	const quickBody = `
		
			if (!Array.isArray(${key})) {
				return 'Value must be an array';
			}

			${
				schema.minLength !== undefined
					? `
			if (${key}.length < ${schema.minLength}) {
				return \`Array length \${${key}.length} is less than minimum length ${schema.minLength}\`;
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (${key}.length > ${schema.maxLength}) {
				return \`Array length \${${key}.length} exceeds maximum length ${schema.maxLength}\`;
			}
			`
					: ''
			}

			for (let i = 0; i < ${key}.length; i++) {
				const ${itemKey} = ${key}[i];
				const itemResult = (() => {
					${itemValidator.isValid}
					return true;
				})();
				if (itemResult !== true) {
					return \`Invalid item at index \${i}: \${itemResult}\`;
				}
			}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
