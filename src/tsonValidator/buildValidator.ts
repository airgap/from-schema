import {
	ArrayTsonSchema,
	BigIntTsonSchema,
	DateTsonSchema,
	EnumTsonSchema,
	OneOfTsonSchema,
} from '../tson';
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
import { buildBigintValidator } from './buildBigintValidator';
import { buildEnumValidator } from './buildEnumValidator';
import { buildOneOfValidator } from './buildOneOfValidator';
import { buildDateValidator } from './buildDateValidator';
import { ProtoValidator } from '../ProtoValidator';

export function buildValidator(
	key: string,
	schema: TsonSchemaOrPrimitive,
): ProtoValidator {
	// Handle primitive literals
	switch (typeof schema) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'bigint': {
			const expectedValue = schema;
			return {
				validate: `
					if(${key} !== ${JSON.stringify(expectedValue)})
						allErrors.push('Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + ${key})
						`,
				validateOrThrow: `
					if (${key} !== ${JSON.stringify(expectedValue)}) {
						throw new Error('Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + ${key});
					}
				`,
				isValid: `
					if(${key} !== ${JSON.stringify(expectedValue)})
						return 'Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + ${key}
				`,
			};
		}
	}

	// Handle array literals
	if (Array.isArray(schema)) {
		const expectedValue = schema;
		return {
			validate: `
				${key} === ${JSON.stringify(expectedValue)} ? [] : allErrors.push('Expected ${schema}, got ' + ${key})`,
			validateOrThrow: `
				if (${key} !== ${JSON.stringify(expectedValue)}) {
					throw new Error('Expected ${schema}, got ' + ${key});
				}
			`,
			isValid: `
				${key} === ${JSON.stringify(expectedValue)} ? true : 'Expected ${schema}, got ' + ${key}`,
		};
	}
	// console.log('KEY', key, 'SCHEMA', schema);
	// Handle schema objects
	if ('enum' in schema)
		return buildEnumValidator(key, schema as EnumTsonSchema);
	if ('oneOf' in schema)
		return buildOneOfValidator(key, schema as OneOfTsonSchema);

	switch ('type' in schema && schema.type) {
		case 'array':
			return buildArrayValidator(key, schema as ArrayTsonSchema);
		case 'object':
			return buildObjectValidator(key, schema as ObjectTsonSchema);
		case 'string':
			return buildStringValidator(key, schema as StringTsonSchema);
		case 'bigint':
			return buildBigintValidator(key, schema as BigIntTsonSchema);
		case 'number':
		case 'integer':
			return buildNumberValidator(key, schema as NumberTsonSchema);
		case 'boolean':
			return buildBooleanValidator(key, schema as BooleanTsonSchema);
		case 'date':
			return buildDateValidator(key, schema as DateTsonSchema);
		default:
			throw new Error(`Invalid schema: ${JSON.stringify(schema, null, 4)}`);
	}
}
