import { Primitive } from '../generic';
import { ArrayJsonBSchema } from './ArrayJsonBSchema';
import { EnumJsonBSchema } from './EnumJsonBSchema';
import { ObjectJsonBSchema } from './ObjectJsonBSchema';
import { StringJsonBSchema } from './StringJsonBSchema';
import { BooleanJsonBSchema } from './BooleanJsonBSchema';
import { NumberJsonBSchema } from './NumberJsonBSchema';
import { UnionJsonBSchema } from './UnionJsonBSchema';
import { MapJsonBSchema } from './MapJsonBSchema';
import { DateJsonBSchema } from './DateJsonBSchema';
import { OneOfJsonBSchema } from './OneOfJsonBSchema';
import { AnyOfJsonBSchema } from './AnyOfJsonBSchema';
import { AllOfJsonBSchema } from './AllOfJsonBSchema';

export type JsonBSchema =
	| ArrayJsonBSchema
	| BooleanJsonBSchema
	| EnumJsonBSchema
	| DateJsonBSchema
	| MapJsonBSchema
	| NumberJsonBSchema
	| ObjectJsonBSchema
	| StringJsonBSchema
	| UnionJsonBSchema
	| OneOfJsonBSchema
	| AllOfJsonBSchema
	| AnyOfJsonBSchema;

export type JsonBSchemaOrPrimitive = JsonBSchema | Primitive;
