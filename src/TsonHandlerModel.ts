import { TsonSchema } from './tson';

type Unauthed = {
	authenticated: false;
	throws?: number[];
};

type Authed = {
	authenticated: true;
	throws?: number[];
};

export type TsonHandlerBase = {
	readonly response?: TsonSchema;
	readonly authenticated?: boolean;
	readonly throws?: readonly number[];
	readonly path?: string;

	// Documentation fields
	/**
	 * Human-friendly title for the endpoint
	 * @example "Accept Friend Request"
	 */
	readonly title?: string;

	/**
	 * Detailed description of what this endpoint does
	 */
	readonly description?: string;

	/**
	 * Category/group this endpoint belongs to for organizing documentation
	 * @example "Friendship", "Posts", "Authentication"
	 */
	readonly category?: string;

	/**
	 * Tags for filtering and searching
	 * @example ["social", "friends", "relationships"]
	 */
	readonly tags?: readonly string[];

	/**
	 * Example request/response pairs with explanations
	 */
	readonly examples?: readonly {
		readonly title: string;
		readonly description?: string;
		readonly request?: unknown;
		readonly response?: unknown;
		readonly status?: number;
	}[];

	/**
	 * Additional notes, warnings, or important information
	 */
	readonly notes?: readonly string[];

	/**
	 * Detailed error documentation
	 */
	readonly errors?: readonly {
		readonly code: number;
		readonly title: string;
		readonly description: string;
		readonly example?: unknown;
		readonly resolution?: string;
	}[];

	/**
	 * Links to related endpoints
	 */
	readonly relatedEndpoints?: readonly string[];

	/**
	 * Version when this endpoint was added
	 * @example "1.0.0"
	 */
	readonly since?: string;

	/**
	 * If deprecated, when and what to use instead
	 */
	readonly deprecated?: {
		readonly since: string;
		readonly useInstead?: string;
		readonly reason?: string;
	};

	/**
	 * Rate limiting information
	 */
	readonly rateLimit?: {
		readonly requests: number;
		readonly period: string;
		readonly scope?: 'user' | 'ip' | 'global';
	};

	/**
	 * Required permissions or roles
	 */
	readonly requiredPermissions?: readonly string[];
} & (Unauthed | Authed);

export type StreamConfig = {
	readonly tweakRequest?: TsonSchema;
	readonly tweakResponse?: TsonSchema;
};

type GetHandlerModel = TsonHandlerBase & {
	readonly method: 'GET';
};

type PostHandlerModel = TsonHandlerBase & {
	readonly method: 'POST';
	readonly request?: TsonSchema;
};

type PutHandlerModel = TsonHandlerBase & {
	readonly method: 'PUT';
	readonly request?: TsonSchema;
};

type DeleteHandlerModel = TsonHandlerBase & {
	readonly method: 'DELETE';
	readonly request?: TsonSchema;
};

type PatchHandlerModel = TsonHandlerBase & {
	readonly method: 'PATCH';
	readonly request?: TsonSchema;
};

type OptionsHandlerModel = TsonHandlerBase & {
	readonly method: 'OPTIONS';
};

type HeadHandlerModel = TsonHandlerBase & {
	readonly method: 'HEAD';
};

type VagueHandlerModel = TsonHandlerBase & {
	readonly request?: TsonSchema;
};

export type TsonHttpHandlerModel = Readonly<
	| GetHandlerModel
	| PostHandlerModel
	| PutHandlerModel
	| DeleteHandlerModel
	| PatchHandlerModel
	| OptionsHandlerModel
	| HeadHandlerModel
	| VagueHandlerModel
>;

export type TsonStreamHandlerModel = Readonly<
	TsonHandlerBase & { readonly stream: true | StreamConfig }
>;

export type TsonHandlerModel = TsonHttpHandlerModel | TsonStreamHandlerModel;
