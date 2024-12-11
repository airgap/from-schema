export class ProtoGenerator {
	private indent = '';
	private messages: Set<string> = new Set();
	private enums: Set<string> = new Set();

	constructor(private packageName: string = 'generated') {}

	private incrementIndent() {
		this.indent += '  ';
	}

	private decrementIndent() {
		this.indent = this.indent.slice(2);
	}

	private typeToProto(schema: any): string {
		// Handle enum types
		if (schema.type === 'enum' || schema.enum) {
			return 'enum';
		}

		const typeMap: Record<string, string> = {
			string: 'string',
			text: 'string',
			number: 'double',
			integer: 'int32',
			boolean: 'bool',
			bigint: 'int64',
			bigserial: 'int64',
			object: 'message',
			array: 'repeated',
		};

		return typeMap[schema.type] || 'string';
	}

	private generateEnum(name: string, values: string[]): string {
		const enumDef = [`enum ${name} {`];
		this.incrementIndent();

		values.forEach((value, index) => {
			// Convert to SCREAMING_SNAKE_CASE and ensure valid proto enum value
			const enumValue = value
				.toUpperCase()
				.replace(/[^A-Z0-9]+/g, '_')
				.replace(/^[0-9]/, '_$&');
			enumDef.push(`${this.indent}${enumValue} = ${index};`);
		});

		this.decrementIndent();
		enumDef.push('}');
		return enumDef.join('\n');
	}

	private generateMessage(name: string, schema: any): string {
		if (schema.type === 'enum' || schema.enum) {
			const enumValues = schema.enum || [];
			const enumDef = this.generateEnum(name, enumValues);
			this.enums.add(enumDef);
			return '';
		}

		const lines = [`message ${name} {`];
		this.incrementIndent();

		let fieldNumber = 1;
		const properties = schema.properties || {};

		for (const [fieldName, fieldSchema] of Object.entries(properties)) {
			let fieldType = this.typeToProto(fieldSchema);
			let line = '';

			if (fieldType === 'enum') {
				const enumName = `${name}${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}Enum`;
				this.enums.add(this.generateEnum(enumName, (fieldSchema as any).enum));
				line = `${this.indent}${enumName} ${fieldName} = ${fieldNumber};`;
			} else if (fieldType === 'message') {
				const messageName = `${name}${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
				this.generateMessage(messageName, fieldSchema);
				line = `${this.indent}${messageName} ${fieldName} = ${fieldNumber};`;
			} else if (fieldType === 'repeated') {
				const itemType = this.typeToProto((fieldSchema as any).items);
				line = `${this.indent}repeated ${itemType} ${fieldName} = ${fieldNumber};`;
			} else {
				line = `${this.indent}${fieldType} ${fieldName} = ${fieldNumber};`;
			}

			lines.push(line);
			fieldNumber++;
		}

		this.decrementIndent();
		lines.push('}');
		const message = lines.join('\n');
		this.messages.add(message);
		return message;
	}

	public generateSchema(schemas: Record<string, any>): string {
		this.messages.clear();
		this.enums.clear();

		// Process all schemas
		for (const [name, schema] of Object.entries(schemas)) {
			const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
			this.generateMessage(pascalName, schema);
		}

		// Combine everything into a proper proto file
		const lines = [
			'syntax = "proto3";',
			'',
			`package ${this.packageName};`,
			'',
			'import "google/protobuf/timestamp.proto";',
			'',
			...Array.from(this.enums),
			'',
			...Array.from(this.messages),
		];

		return lines.join('\n');
	}
}
