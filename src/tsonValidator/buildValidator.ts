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

export function buildValidator(schema: TsonSchemaOrPrimitive): ProtoValidator {
	// Handle primitive literals
	switch (typeof schema) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'bigint': {
			const expectedValue = schema;
			return {
				validate: `(value: unknown): string[] => 
					value === ${JSON.stringify(expectedValue)}
						? []
						: [
							'Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + value
						]`,
				validateOrThrow: `(value: unknown): void => {
					if (value !== ${JSON.stringify(expectedValue)}) {
						throw new Error('Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + value);
					}
				}`,
				isValid: `(value: unknown): true | string =>
					value === ${JSON.stringify(expectedValue)}
						? true
						: 'Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ' + value`,
			};
		}
	}

	// Handle array literals
	if (Array.isArray(schema)) {
		const expectedValue = schema;
		return {
			validate: `(value: unknown): string[] =>
				value === ${JSON.stringify(expectedValue)} ? [] : ['Expected ${schema}, got ' + value]`,
			validateOrThrow: `(value: unknown): void => {
				if (value !== ${JSON.stringify(expectedValue)}) {
					throw new Error('Expected ${schema}, got ' + value);
				}
			}`,
			isValid: `(value: unknown): true | string =>
				value === ${JSON.stringify(expectedValue)} ? true : 'Expected ${schema}, got ' + value`,
		};
	}

	// Handle schema objects
	if ('enum' in schema) return buildEnumValidator(schema as EnumTsonSchema);
	if ('oneOf' in schema) return buildOneOfValidator(schema as OneOfTsonSchema);

	switch ('type' in schema && schema.type) {
		case 'array':
			return buildArrayValidator(schema as ArrayTsonSchema);
		case 'object':
			return buildObjectValidator(schema as ObjectTsonSchema);
		case 'string':
			return buildStringValidator(schema as StringTsonSchema);
		case 'bigint':
			return buildBigintValidator(schema as BigIntTsonSchema);
		case 'number':
		case 'integer':
			return buildNumberValidator(schema as NumberTsonSchema);
		case 'boolean':
			return buildBooleanValidator(schema as BooleanTsonSchema);
		case 'date':
			return buildDateValidator(schema as DateTsonSchema);
		default:
			throw new Error(`Invalid schema: ${JSON.stringify(schema, null, 4)}`);
	}
}
