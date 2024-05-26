# from-schema

## Convert JSON schemas to TypeScript types

### Notes

- Only a small subset of JSONschema is supported
- This library is very opinionated
- Probably don't use this in production

### Example - social media post

```tsx
// Import various from-schema types
import { ArraySchema, EnumSchema, FromSchema, ObjectSchema } from 'from-schema';

// Import project-specific models defined elsewhere
import { attachment } from './attachment';
import { postBody } from './postBody';
import { postTitle } from './postTitle';
import { user } from './user';

// uuid can be passed to AJV for full UUID validation
export const uuid = {
	type: 'string',
	pattern:
		'^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$',
} as const satisfies StringSchema;

// TypeScript will see Uuid as a standard string
export type Uuid = FromSchema<typeof uuid>;
/** Equivalent:
 *  type Uuid = string;
 * */

// Define an EnumSchema for the post body type
export const bodyType = {
	enum: ['plaintext', 'markdown'],
} as const satisfies EnumSchema;

// Export a type inferred from bodyType
export type BodyType = FromSchema<typeof bodyType>;
/** Equivalent:
 *  type BodyType = 'plaintext' | 'markdown'
 * */

// Define an array of attachments (defined elsewhere)
export const attachments = {
	type: 'array',
	items: attachment,
} as const satisfies ArraySchema;

// Infer a type based on that model
export type Attachments = FromSchema<typeof attachments>;
/* Equivalent:
 *  type Attachments = {<external definition>}[];
 * */

// Define the post itself -- AJV can compile this into a validator
export const post = {
	description: 'A post containing text, images, or videos',
	type: 'object',
	properties: {
		id: uuid, // You can embed schemas in other schemas
		body: postBody, // Maybe this is a string with specific constraints?
		bodyType,
		groupId: uuid,
		attachments,
		authorId: user.properties.id, // You can model document relationships
		likes: {
			type: 'number',
		},
		publishDate: {
			type: 'string',
		},
		replies: {
			type: 'number',
		},
		title: postTitle, // Another string with constraints defined elsewhere
		thread: {
			type: 'array',
			items: uuid,
		},
	},
	required: [
		'id',
		'authorId',
		'attachments',
		'publishDate',
		'likes',
		'replies',
	],
} as const satisfies ObjectSchema;

// Infer a TypeScript type
export type Post = FromSchema<typeof post>;
/** Equivalent:
 *  type Post = {
 *    id: string,
 *    body?: string,
 *    bodyType?: 'plaintest' | 'markdown'
 *    groupId?: string,
 *    attachments: {...}[],
 *    authorId: string,
 *    likes: number,
 *    publishDate: string,
 *    replies: number,
 *    title?: string,
 *    thread?: string[]
 *  }
 * */
```

## Generated documentation

This section is experimental and may be removed in future.

### ArraySchema

Defined in `ArraySchema.ts`.

```typescript
export type ArraySchema = SchemaBase & {
	readonly type: 'array';
	readonly items: SchemaOrPrimitive;
	readonly maxLength?: number;
	readonly minLength?: number;
};
```

Represents an array schema. It extends the `SchemaBase` and has the following properties:

- `type`: Must be `'array'`.
- `items`: The schema or primitive type for the array elements.
- `maxLength` (optional): The maximum length of the array.
- `minLength` (optional): The minimum length of the array.

### BooleanSchema

Defined in `BooleanSchema.ts`.

```typescript
export type BooleanSchema = SchemaBase & {
	readonly type: 'boolean';
};
```

Represents a boolean schema. It extends the `SchemaBase` and has the following property:

- `type`: Must be `'boolean'`.

### EnumSchemaOf

Defined in `EnumSchemaOf.ts`.

```typescript
export type EnumSchemaOf<K> = SchemaBase & {
	readonly enum: readonly K[];
};
```

Represents an enumeration schema of a specific type `K`. It extends the `SchemaBase` and has the following property:

- `enum`: An array of values of type `K` that the schema can take.

### EnumSchema

Defined in `EnumSchema.ts`.

```typescript
export type EnumSchema = SchemaBase & {
	readonly enum: readonly (string | number | StringSchema | NumberSchema)[];
};
```

Represents an enumeration schema. It extends the `SchemaBase` and has the following property:

- `enum`: An array of string, number, `StringSchema`, or `NumberSchema` values that the schema can take.

### FromObjectSchema

Defined in `FromObjectSchema.ts`.

```typescript
export type FromObjectSchema<T extends ObjectSchema> = OnlyRequired<T> &
	OnlyOptional<T>;
```

A utility type that constructs an object type from an `ObjectSchema`. It combines the required and optional properties of the schema.

### FromPropertySchemas

Defined in `FromPropertySchemas.ts`.

```typescript
export type FromPropertySchemas<T extends ObjectSchema> = {
	-readonly [K in keyof T['properties']]: PrimitiveOrFromSchema<
		T['properties'][K]
	>;
};
```

A utility type that constructs an object type from the `properties` of an `ObjectSchema`. It maps each property to its primitive or schema type.

### FromSchema

Defined in `FromSchema.ts`.

```typescript
export type FromSchema<T> = T extends StringSchema
	? string
	: T extends NumberSchema
		? number
		: T extends BooleanSchema
			? boolean
			: T extends UnionSchemaOf<infer P extends SchemaOrPrimitive>
				? PrimitiveOrFromSchema<P>
				: T extends EnumSchemaOf<infer P extends SchemaOrPrimitive>
					? PrimitiveOrFromSchema<P>
					: T extends ObjectSchema
						? FromObjectSchema<T>
						: T extends MapSchema
							? FromMapSchema<T>
							: T extends ArraySchema
								? FromSchema<T['items']>[]
								: NoSchema;
```

A utility type that constructs a TypeScript type from a schema type. It recursively maps the schema types to their corresponding TypeScript types.

### HttpRoute

Defined in `HttpRoute.ts`.

```typescript
export type HttpRoute = SchemaBase & {
	readonly request: ObjectSchema;
	readonly response: ObjectSchema;
	readonly authenticated: boolean;
};
```

Represents an HTTP route schema. It extends the `SchemaBase` and has the following properties:

- `request`: An `ObjectSchema` representing the request schema.
- `response`: An `ObjectSchema` representing the response schema.
- `authenticated`: A boolean indicating if authentication is required for the route.

### MapSchema

Defined in `MapSchema.ts`.

```typescript
export type MapSchema = {
	readonly type: 'map';
	readonly keys: StringSchema | EnumSchemaOf<string>;
	readonly values: Schema;
	readonly partial?: boolean;
};
```

Represents a map schema. It has the following properties:

- `type`: Must be `'map'`.
- `keys`: A `StringSchema` or `EnumSchemaOf<string>` representing the schema for the map keys.
- `values`: The schema for the map values.
- `partial` (optional): A boolean indicating if the map is partial (allows undefined values).

### MapSchemaOf

Defined in `MapSchema.ts`.

```typescript
export type MapSchemaOf<
	K extends StringSchema | EnumSchemaOf<string>,
	V,
	P = false,
> = SchemaBase & {
	readonly type: 'map';
	readonly keys: K;
	readonly values: V;
	readonly partial: P;
};
```

Represents a map schema of specific key and value types. It extends the `SchemaBase` and has the following properties:

- `type`: Must be `'map'`.
- `keys`: The schema for the map keys, of type `K`.
- `values`: The schema or primitive type for the map values, of type `V`.
- `partial`: A boolean indicating if the map is partial (allows undefined values), defaulting to `false`.

### FromMapSchema

Defined in `MapSchema.ts`.

```typescript
export type FromMapSchema<S extends MapSchema> = S['partial'] extends true
	? {
			-readonly [key in S['keys'] extends EnumSchemaOf<infer M extends string>
				? M
				: string]?: FromSchema<S['values']>;
		}
	: {
			-readonly [key in S['keys'] extends EnumSchemaOf<infer M extends string>
				? M
				: string]: FromSchema<S['values']>;
		};
```

A utility type that constructs a map type from a `MapSchema`. It maps the key and value schemas to their corresponding TypeScript types, considering the `partial` property.

### NumberSchema

Defined in `NumberSchema.ts`.

```typescript
export type NumberSchema = SchemaBase & {
	readonly type: 'number' | 'integer';
	readonly minimum?: number;
	readonly maximum?: number;
};
```

Represents a number schema. It extends the `SchemaBase` and has the following properties:

- `type`: Must be `'number'` or `'integer'`.
- `minimum` (optional): The minimum value for the number.
- `maximum` (optional): The maximum value for the number.

### ObjectSchema

Defined in `ObjectSchema.ts`.

```typescript
export type ObjectSchemaWithoutRequired = SchemaBase & {
	readonly type: 'object';
	readonly properties: Record<string, SchemaOrPrimitive>;
	readonly minProperties?: number;
	readonly maxProperties?: number;
};

export type ObjectSchemaWithRequired = ObjectSchemaWithoutRequired & {
	readonly required: readonly string[];
};

export type ObjectSchema =
	| ObjectSchemaWithoutRequired
	| ObjectSchemaWithRequired;
```

Represents an object schema. It extends the `SchemaBase` and has the following properties:

- `type`: Must be `'object'`.
- `properties`: A record of property names and their corresponding schemas or primitive types.
- `minProperties` (optional): The minimum number of properties required in the object.
- `maxProperties` (optional): The maximum number of properties allowed in the object.
- `required` (optional): An array of required property names.

### OnlyOptional

Defined in `OnlyOptional.ts`.

```typescript
export type OnlyOptional<T extends ObjectSchema> =
	T extends ObjectSchemaWithRequired
		? Partial<Omit<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Partial<T['properties']>;
```

A utility type that constructs an object type with only the optional properties of an `ObjectSchema`.

### OnlyRequired

Defined in `OnlyRequired.ts`.

```typescript
export type OnlyRequired<T extends ObjectSchema> =
	T extends ObjectSchemaWithRequired
		? Required<Pick<FromPropertySchemas<T>, RequiredPropOf<T>>>
		: Record<string, never>;
```

A utility type that constructs an object type with only the required properties of an `ObjectSchema`.

### PrimitiveOrFromSchema

Defined in `PrimitiveOrFromSchema.ts`.

```typescript
export type PrimitiveOrFromSchema<T extends SchemaOrPrimitive> =
	T extends Schema ? FromSchema<T> : T;
```

A utility type that constructs a TypeScript type from a schema or primitive type. If the input is a schema, it uses `FromSchema` to convert it to a TypeScript type; otherwise, it returns the primitive type as is.

### Primitive

Defined in `Primitive.ts`.

```typescript
export type Primitive = string | number | boolean | string[];
```

Represents a primitive type, which can be a string, number, boolean, or an array of strings.

### RequiredPropOf

Defined in `RequiredPropOf.ts`.

```typescript
export type RequiredPropOf<T extends ObjectSchemaWithRequired> = Extract<
	keyof T['properties'],
	T['required'][number]
>;
```

A utility type that extracts the required property names from an `ObjectSchemaWithRequired`.

### SchemaBase

Defined in `SchemaBase.ts`.

```typescript
export type SchemaBase = {
	readonly description?: string;
};
```

Represents the base schema type. It has an optional `description` property for providing a description of the schema.

### SchemaOrPrimitive

Defined in `SchemaOrPrimitive.ts`.

```typescript
export type SchemaOrPrimitive = Schema | Primitive;
```

Represents a schema or primitive type.

### Schema

Defined in `Schema.ts`.

```typescript
export type Schema =
	| ArraySchema
	| BooleanSchema
	| EnumSchema
	| MapSchema
	| NumberSchema
	| ObjectSchema
	| StringSchema
	| UnionSchema;
```

A union type representing all the available schema types.

### StringSchema

Defined in `StringSchema.ts`.

```typescript
export type StringSchema = SchemaBase & {
	readonly type: 'string';
	readonly minLength?: number;
	readonly maxLength?: number;
	readonly pattern?: string;
	readonly format?: string;
};
```

Represents a string schema. It extends the `SchemaBase` and has the following properties:

- `type`: Must be `'string'`.
- `minLength` (optional): The minimum length of the string.
- `maxLength` (optional): The maximum length of the string.
- `pattern` (optional): A regular expression pattern that the string must match.
- `format` (optional): A format specifier for the string (e.g., 'date', 'email').

### UnionSchemaOf

Defined in `UnionSchemaOf.ts`.

```typescript
export type UnionSchemaOf<K extends SchemaOrPrimitive> = SchemaBase & {
	readonly union: readonly K[];
};
```

Represents a union schema of a specific type `K`. It extends the `SchemaBase` and has the following property:

- `union`: An array of schemas or primitive types that the schema can take.

### UnionSchema

Defined in `UnionSchema.ts`.

```typescript
export type UnionSchema = SchemaBase & {
	readonly union: readonly SchemaOrPrimitive[];
};
```

Represents a union schema. It extends the `SchemaBase` and has the following property:

- `union`: An array of schemas or primitive types that the schema can take.

### WebSocketRoute

Defined in `WebSocketRoute.ts`.

```typescript
export type WebSocketRoute = SchemaBase & Record<string, never>;
```

Represents a WebSocket route schema. It extends the `SchemaBase` and has no additional properties.

## Usage Examples

Here are some usage examples for the different schema types:

### ArraySchema

```typescript
import { ArraySchema } from './ArraySchema';

const myArraySchema: ArraySchema = {
	type: 'array',
	items: {
		type: 'string',
	},
	maxLength: 10,
	minLength: 1,
};
```

### BooleanSchema

```typescript
import { BooleanSchema } from './BooleanSchema';

const myBooleanSchema: BooleanSchema = {
	type: 'boolean',
};
```

### EnumSchema

```typescript
import { EnumSchema } from './EnumSchema';

const myEnumSchema: EnumSchema = {
	enum: ['red', 'green', 'blue'],
};
```

### MapSchema

```typescript
import { MapSchema } from './MapSchema';

const myMapSchema: MapSchema = {
	type: 'map',
	keys: {
		type: 'string',
	},
	values: {
		type: 'number',
	},
	partial: true,
};
```

### NumberSchema

```typescript
import { NumberSchema } from './NumberSchema';

const myNumberSchema: NumberSchema = {
	type: 'number',
	minimum: 0,
	maximum: 100,
};
```

### ObjectSchema

```typescript
import { ObjectSchema } from './ObjectSchema';

const myObjectSchema: ObjectSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
		},
		age: {
			type: 'number',
		},
	},
	required: ['name'],
};
```

### StringSchema

```typescript
import { StringSchema } from './StringSchema';

const myStringSchema: StringSchema = {
	type: 'string',
	minLength: 1,
	maxLength: 50,
	pattern: '^[A-Za-z]+$',
};
```

### UnionSchema

```typescript
import { UnionSchema } from './UnionSchema';

const myUnionSchema: UnionSchema = {
	union: [
		{
			type: 'string',
		},
		{
			type: 'number',
		},
	],
};
```

## Contribution

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's repository.

## License

This project is licensed under the [MIT License](LICENSE).
