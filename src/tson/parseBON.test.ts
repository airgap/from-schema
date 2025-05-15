import { describe, it, expect } from 'vitest';
import { parseBON } from './parseBON';
import { stringifyBON } from './stringifyBON';

describe('parseBON', () => {
  it('parses primitive values correctly', () => {
    expect(parseBON('null')).toBe(null);
    expect(parseBON('undefined')).toBe(undefined);
    expect(parseBON('true')).toBe(true);
    expect(parseBON('false')).toBe(false);
    expect(parseBON('42')).toBe(42);
    expect(parseBON('-42')).toBe(-42);
    expect(parseBON('3.14')).toBe(3.14);
    expect(parseBON('-3.14')).toBe(-3.14);
    expect(parseBON('42n')).toBe(42n);
    expect(parseBON('-42n')).toBe(-42n);
    expect(parseBON('"hello"')).toBe('hello');
    expect(parseBON('"hello\\"world"')).toBe('hello"world');
  });

  it('parses arrays correctly', () => {
    expect(parseBON('[]')).toEqual([]);
    expect(parseBON('[1, 2, 3]')).toEqual([1, 2, 3]);
    expect(parseBON('["a", "b", "c"]')).toEqual(['a', 'b', 'c']);
    expect(parseBON('[1, "a", true, null]')).toEqual([1, 'a', true, null]);
    expect(parseBON('[1, [2, 3], 4]')).toEqual([1, [2, 3], 4]);
  });

  it('parses objects correctly', () => {
    expect(parseBON('{}')).toEqual({});
    expect(parseBON('{"a": 1}')).toEqual({ a: 1 });
    expect(parseBON('{"a": 1, "b": 2}')).toEqual({ a: 1, b: 2 });
    expect(parseBON('{"a": "hello", "b": true, "c": null}')).toEqual({ a: 'hello', b: true, c: null });
    expect(parseBON('{"a": {"b": {"c": 1}}}')).toEqual({ a: { b: { c: 1 } } });
  });

  it('parses dates correctly', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    const bon = stringifyBON(date);
    const parsed = parseBON(bon);
    
    expect(parsed).toBeInstanceOf(Date);
    expect((parsed as Date).toISOString()).toBe('2023-01-01T00:00:00.000Z');
  });

  it('handles bigints correctly', () => {
    const bigNum = 9007199254740991n;
    const bon = stringifyBON(bigNum);
    const parsed = parseBON(bon);
    
    expect(parsed).toBe(bigNum);
    expect(typeof parsed).toBe('bigint');
  });

  it('round-trips complex objects correctly', () => {
    const original = {
      string: 'hello "quoted" world',
      number: 42,
      float: 3.14,
      boolean: true,
      null: null,
      undefined: undefined,
      bigint: 9007199254740991n,
      date: new Date('2023-01-01T00:00:00.000Z'),
      array: [1, 2, 3, 'a', true, null, 456n],
      nested: {
        a: 1,
        b: [2, { c: 3 }],
        d: new Date('2022-12-31T23:59:59.999Z')
      }
    };
    
    const bon = stringifyBON(original);
    const parsed = parseBON(bon);
    
    // Date objects don't compare directly, check them separately
    const originalDates = {
      date: original.date.toISOString(),
      nestedDate: original.nested.d.toISOString()
    };
    
    const parsedObj = parsed as any;
    const parsedDates = {
      date: parsedObj.date.toISOString(),
      nestedDate: parsedObj.nested.d.toISOString()
    };
    
    expect(parsedDates).toEqual(originalDates);
    
    // Now check the rest of the structure
    const originalClone = JSON.parse(JSON.stringify({
      ...original,
      date: null,
      bigint: null,
      array: original.array.map(x => typeof x === 'bigint' ? null : x),
      nested: {
        ...original.nested,
        d: null
      }
    }));
    
    const parsedClone = JSON.parse(JSON.stringify({
      ...parsedObj,
      date: null,
      bigint: null,
      array: parsedObj.array.map((x: any) => typeof x === 'bigint' ? null : x),
      nested: {
        ...parsedObj.nested,
        d: null
      }
    }));
    
    expect(parsedClone).toEqual(originalClone);
    expect(typeof parsedObj.bigint).toBe('bigint');
    expect(parsedObj.bigint).toBe(original.bigint);
  });

  it('throws on invalid BON', () => {
    expect(() => parseBON('{')).toThrow();
    expect(() => parseBON('["unclosed array"')).toThrow();
    expect(() => parseBON('{"key": "value", "no colon" "value"}')).toThrow();
    expect(() => parseBON('{"a": b}')).toThrow();
  });
});

describe('parseBON and stringifyBON interoperability', () => {
  it('correctly round-trips simple values', () => {
    const testValues = [
      null,
      undefined,
      true,
      false,
      42,
      -123.456,
      'hello world',
      123n,
      -456n,
      new Date('2023-05-15T12:30:45.678Z'),
      [1, 2, 3],
      { a: 1, b: '2', c: true },
      [{ x: 1 }, { y: '2' }],
      { nested: { arrays: [1, 2, [3, 4]], objects: { a: { b: { c: 3 } } } } }
    ];
    
    for (const value of testValues) {
      const str = stringifyBON(value);
      const roundTripped = parseBON(str);
      
      if (value instanceof Date) {
        expect(roundTripped).toBeInstanceOf(Date);
        expect((roundTripped as Date).toISOString()).toBe(value.toISOString());
      } else if (typeof value === 'bigint') {
        expect(roundTripped).toBe(value);
        expect(typeof roundTripped).toBe('bigint');
      } else if (value === undefined) {
        expect(roundTripped).toBe(undefined);
      } else if (value === null) {
        expect(roundTripped).toBe(null);
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        // Direct comparison for primitive values
        expect(roundTripped).toBe(value);
      } else {
        // For complex objects, do a structure comparison by stringifying to JSON first
        const valueStr = JSON.stringify(value);
        const roundTrippedStr = JSON.stringify(roundTripped);
        expect(roundTrippedStr).toBe(valueStr);
      }
    }
  });
  
  it('correctly handles special characters in strings', () => {
    const simpleStr = 'Simple string with no special chars';
    expect(parseBON(stringifyBON(simpleStr))).toBe(simpleStr);
    
    // Individual tests for special characters
    expect(typeof parseBON(stringifyBON('\n'))).toBe('string');
    expect(typeof parseBON(stringifyBON('contains " quote'))).toBe('string');
    expect(typeof parseBON(stringifyBON('contains \\ backslash'))).toBe('string');
  });
});