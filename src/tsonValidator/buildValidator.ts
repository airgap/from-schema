import { ArrayTsonSchema } from '../tson';
import { ObjectTsonSchema } from '../tson';
import { buildArrayValidator } from './buildArrayValidator';
import { buildObjectValidator } from './buildObjectValidator';
import { BooleanTsonSchema } from '../tson';
import { NumberTsonSchema } from '../tson';
import { StringTsonSchema } from '../tson';
import { TsonSchemaOrPrimitive } from '../tson';
import { buildStringValidator } from './buildStringValidator';
import { buildBooleanValidator } from './buildBooleanValidator';
import { buildNumberValidator } from './buildNumberValidator';

export function buildValidator(schema: TsonSchemaOrPrimitive) {
	switch (true) {
		case typeof schema === 'string':
		case typeof schema === 'number':
		case typeof schema === 'boolean':
		case typeof schema === 'bigint':
			return (value: unknown) => {
				if (value === schema) return value;
				throw new Error(
					`Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ${value}`,
				);
			};
		case Array.isArray(schema):
			return (value: unknown) => {
				if (value === schema) return value;
				throw new Error(`Expected ${schema}, got ${value}`);
			};
	}

	if ('type' in schema) {
		switch (schema.type) {
			case 'array':
				return buildArrayValidator(schema as ArrayTsonSchema);
			case 'object':
				return buildObjectValidator(schema as ObjectTsonSchema);
			case 'string':
				return buildStringValidator(schema as StringTsonSchema);
			case 'number':
				return buildNumberValidator(schema as NumberTsonSchema);
			case 'boolean':
				return buildBooleanValidator(schema as BooleanTsonSchema);
			default:
				throw new Error('Invalid schema type');
		}
	}
	throw new Error('Invalid schema type');
}
