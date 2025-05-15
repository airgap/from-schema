import { describe, it, expect } from 'vitest';
import { parseBON } from './parseBON';

describe('parseBON debug tests', () => {
  it('throws on empty string', () => {
    expect(() => parseBON('')).toThrow();
  });

  it('handles escape sequences correctly', () => {
    const input = '{"simple": "string with no escapes"}';
    const result = parseBON(input) as any;
    expect(result.simple).toBe("string with no escapes");
  });
});