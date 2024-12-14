import { BooleanTsonSchema } from '../tson/BooleanTsonSchema';
import { ValidationError } from './ValidationError';

export function buildBooleanValidator(schema: BooleanTsonSchema) {
	const hasDefault = schema.default !== undefined;
	const defaultValue: boolean = schema.default as boolean;

	return function validateBoolean(value: unknown): boolean {
		if (typeof value === 'boolean') return value;
		if (hasDefault && value === undefined) return defaultValue;
		throw new ValidationError(`Expected boolean, got ${typeof value}`);
	};
}
