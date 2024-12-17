import { EnumTsonSchema } from '../tson/EnumTsonSchema';

export function buildEnumValidator(schema: EnumTsonSchema) {
	const enumLookup = Object.fromEntries(
		schema.enum.map((value) => [value, true]),
	);
	const closureVars: Record<string, any> = {
		enumLookup,
		enumValues: schema.enum,
	};

	const functionBody = `
        if (!enumLookup[value]) {
            return "Value must be one of: " + enumValues.join(", ");
        }
        return undefined;
    `;

	return new Function(
		...Object.keys(closureVars),
		`return function validate(value) { ${functionBody} }`,
	)(...Object.values(closureVars)) as (value: unknown) => string | undefined;
}
