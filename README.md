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
