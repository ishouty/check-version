import { checkVersion } from './check-version.util';

describe('checkVersion', () => {
  test('returns true when userVersion is newer', () => {
    expect(checkVersion('1.2.4', '1.2.3')).toBe(true);
    expect(checkVersion('2.0.0', '1.9.9')).toBe(true);
    expect(checkVersion('1.10.0', '1.9.9')).toBe(true);
  });

  test('returns false when userVersion is older', () => {
    expect(checkVersion('1.2.3', '1.2.4')).toBe(false);
    expect(checkVersion('1.0.0', '2.0.0')).toBe(false);
    expect(checkVersion('1.9.9', '1.10.0')).toBe(false);
  });

  test('returns undefined when versions are equal', () => {
    expect(checkVersion('1.2.3', '1.2.3')).toBeUndefined();
    expect(checkVersion('2.0.0', '2.0.0')).toBeUndefined();
    expect(checkVersion('1.10', '1.10.0')).toBeUndefined();
  });

  test('handles different length versions', () => {
    expect(checkVersion('1.2', '1.2.0')).toBeUndefined(); // 1.2 == 1.2.0
    expect(checkVersion('1.2.1', '1.2')).toBe(true); // 1.2.1 > 1.2
    expect(checkVersion('1.2', '1.2.1')).toBe(false); // 1.2 < 1.2.1
  });
});
