import { isValidDate } from './isDate';

/**
 * Stringifies a JavaScript value into a BON (JSON with BigInt support) string.
 * 
 * @param value The value to stringify
 * @param space Optional space for formatting (not currently used)
 * @param seen Optional Set of already seen objects (used internally for circular reference detection)
 * @returns The BON string representation
 * @throws Error for circular references or unsupported types
 */
export const stringifyBON = (
  value: unknown, 
  space = '', 
  seen: Set<unknown> = new Set()
): string => {
  // Handle null separately as it's not a typeof result
  if (value === null) {
    return 'null';
  }

  // If we've already seen this object, we have a circular reference
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) {
      throw new Error('Circular reference detected during stringification');
    }
    // Add the current object to the seen set before processing its children
    seen.add(value);
  }

  switch (typeof value) {
    case 'string': {
      // Match the escape patterns expected by the tests
      // The main issue was with control characters not being properly stringified
      let result = value;
      
      // Escape backslashes first
      result = result.replace(/\\/g, '\\\\');
      
      // Escape quotes
      result = result.replace(/"/g, '\\"');
      
      // Match control characters with escape sequences
      if (result.includes('\n')) result = result.replace(/\n/g, '\\n');
      if (result.includes('\r')) result = result.replace(/\r/g, '\\r');
      if (result.includes('\t')) result = result.replace(/\t/g, '\\t');
      if (result.includes('\f')) result = result.replace(/\f/g, '\\f');
      if (result.includes('\b')) result = result.replace(/\b/g, '\\b');
      
      return `"${result}"`;
    }

    case 'undefined':
      return 'undefined';

    case 'number':
      // Handle special number values, but ensure they're stringified correctly
      if (isNaN(value as number)) {
        return 'NaN';
      }
      if (!isFinite(value as number)) {
        return value < 0 ? '-Infinity' : 'Infinity';
      }
      return value.toString();

    case 'boolean':
      return value.toString();

    case 'symbol':
    case 'function':
      return value.toString(); // Convert symbols and functions to string

    case 'bigint':
      return value.toString() + 'n'; // Convert bigint to string with 'n' suffix

    case 'object':
      // Check for special object types first
      if (Array.isArray(value)) {
        // Handle sparse arrays by explicitly checking each index
        const arrayItems = [];
        for (let i = 0; i < value.length; i++) {
          if (i in value) {
            arrayItems.push(stringifyBON(value[i], space, seen));
          } else {
            arrayItems.push('undefined');
          }
        }
        return `[${arrayItems.join(', ')}]`;
      }

      if (isValidDate(value)) {
        return value.toISOString();
      }

      // Special handling for Error objects
      if (value instanceof Error) {
        const errorObject: Record<string, unknown> = {};
        // Include standard error properties
        if (value.message) errorObject.message = value.message;
        if (value.name) errorObject.name = value.name;
        if (value.stack) errorObject.stack = value.stack;
        
        // Add any other enumerable properties
        for (const key of Object.keys(value)) {
          errorObject[key] = (value as any)[key];
        }
        
        // Now stringify the error object
        const serializedError = Object.entries(errorObject)
          .map(([key, item]) => {
            const serializedKey = `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; // Escape key
            const serializedValue = stringifyBON(item, space, seen);
            return `${serializedKey}: ${serializedValue}`;
          })
          .join(', ');
        
        // Remove the error object from the seen set after we're done with it
        seen.delete(value);
        
        return `{${serializedError}}`;
      }

      // Handle regular objects
      const objectEntries = Object.entries(value)
        .map(([key, item]: [string, unknown]) => {
          const serializedKey = `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; // Escape key
          const serializedValue = stringifyBON(item, space, seen);
          return `${serializedKey}: ${serializedValue}`; // Serialize objects
        })
        .join(', ');

      // Remove the current object from the seen set after we're done with it
      seen.delete(value);
      
      return `{${objectEntries}}`;
  }

  throw new Error('Unsupported type: ' + (typeof value));
};