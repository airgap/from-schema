import {
	ArrayTsonSchema,
	BigIntTsonSchema,
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

export function buildValidator(schema: TsonSchemaOrPrimitive) {
	switch (typeof schema) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'bigint':
			return (value: unknown) => {
				if (value === schema) return value;
				throw new Error(
					`Expected ${typeof schema === 'string' ? `"${schema}"` : schema}, got ${value}`,
				);
			};
	}
	if (Array.isArray(schema))
		return (value: unknown) => {
			if (value === schema) return value;
			throw new Error(`Expected ${schema}, got ${value}`);
		};
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
			return buildNumberValidator(schema as NumberTsonSchema);
		case 'boolean':
			return buildBooleanValidator(schema as BooleanTsonSchema);
		default:
			throw new Error(`Invalid schema: ${JSON.stringify(schema, null, 4)}`);
	}
}
