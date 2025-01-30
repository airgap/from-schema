export const stringifyBON = (value: unknown, space = ''): string => {
	if (value === null) {
		return 'null';
	}
	if (typeof value === 'string') {
		return `"${value.replace(/"/g, '\\"')}"`; // Escape double quotes
	}
	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value); // Convert numbers and booleans to string
	}
	if (typeof value === 'bigint') {
		return value.toString() + 'n'; // Convert bigint to string
	}
	if (Array.isArray(value)) {
		const arrayItems = value.map((item) => stringifyBON(item)).join(', ');
		return `[${arrayItems}]`; // Serialize arrays
	}
	if (typeof value === 'object') {
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
