import { isValidDate } from './isDate';

export const stringifyBON = (value: unknown, space = ''): string => {
	if (value === null) {
		return 'null';
	}
	switch (typeof value) {
		case 'string':
			return `"${value.replace(/"/g, '\\"')}"`;
		case 'undefined':
			return 'undefined';
		case 'number':
		case 'boolean':
		case 'symbol':
		case 'function':
			return value.toString(); // Convert numbers and booleans to string
		case 'bigint':
			return value.toString() + 'n'; // Convert bigint to string
		case 'object':
			if (Array.isArray(value)) {
				const arrayItems = value.map((item) => stringifyBON(item)).join(', ');
				return `[${arrayItems}]`; // Serialize arrays
			}
			if (isValidDate(value)) return value.toISOString();
			const objectEntries = Object.entries(value)
				.map(([key, item]: [string, unknown]) => {
					const serializedKey = `"${key.replace(/"/g, '\\"')}"`; // Escape key
					const serializedValue = stringifyBON(item);
					return `${serializedKey}: ${serializedValue}`; // Serialize objects
				})
				.join(', ');
			return `{${objectEntries}}`;
	}
	throw new Error('Unsupported type' + JSON.stringify(value));
	return 'never'; // For unsupported types
};
