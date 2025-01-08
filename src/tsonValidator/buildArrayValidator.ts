import { ArrayTsonSchema } from '../tson/ArrayTsonSchema';
import { ProtoValidator } from '../ProtoValidator';
import { buildValidator } from './buildValidator';
import { ValidationError } from './ValidationError';

export function buildArrayValidator(schema: ArrayTsonSchema): {
	validate: string;
	validateOrThrow: string;
	isValid: string;
} {
	const itemValidator = buildValidator(schema.items);

	// Collecting version
	const collectingBody = `
		function(value: unknown): string[] {
			const errors = [];

			// Check if value is an array
			if (!Array.isArray(value)) {
				return ['Value must be an array'];
			}

			// Check minLength
			${
				schema.minLength !== undefined
					? `
			if (value.length < ${schema.minLength}) {
				errors.push(\`Array length \${value.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}

			// Check maxLength
			${
				schema.maxLength !== undefined
					? `
			if (value.length > ${schema.maxLength}) {
				errors.push(\`Array length \${value.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}

			// Validate each item
			for (let i = 0; i < value.length; i++) {
				const itemErrors = (${itemValidator.validate})(value[i]);
				if (itemErrors.length > 0) {
					errors.push(\`Invalid item at index \${i}: \${itemErrors.join(', ')}\`);
				}
			}

			return errors;
		}
	`;

	// Fast throwing version
	const throwingBody = `
		function(value: unknown): void {
			const errors = [];

			if (!Array.isArray(value)) {
				throw new Error('Value must be an array');
			}

			${
				schema.minLength !== undefined
					? `
			if (value.length < ${schema.minLength}) {
				throw new Error(\`Array length \${value.length} is less than minimum length ${schema.minLength}\`);
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (value.length > ${schema.maxLength}) {
				throw new Error(\`Array length \${value.length} exceeds maximum length ${schema.maxLength}\`);
			}
			`
					: ''
			}

			for (let i = 0; i < value.length; i++) {
				(${itemValidator.validateOrThrow})(value[i]);
			}
		}
	`;

	// Fast single-error version
	const quickBody = `
		function(value: unknown): true | string {
			if (!Array.isArray(value)) {
				return 'Value must be an array';
			}

			${
				schema.minLength !== undefined
					? `
			if (value.length < ${schema.minLength}) {
				return \`Array length \${value.length} is less than minimum length ${schema.minLength}\`;
			}
			`
					: ''
			}

			${
				schema.maxLength !== undefined
					? `
			if (value.length > ${schema.maxLength}) {
				return \`Array length \${value.length} exceeds maximum length ${schema.maxLength}\`;
			}
			`
					: ''
			}

			for (let i = 0; i < value.length; i++) {
				const result = (${itemValidator.isValid})(value[i]);
				if (result !== true) {
					return \`Invalid item at index \${i}: \${result}\`;
				}
			}

			return true;
		}
	`;

	return {
		validate: collectingBody,
		validateOrThrow: throwingBody,
		isValid: quickBody,
	};
}
