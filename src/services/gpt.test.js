
import {trimLinesHelper} from './gpt';

test('all through (v1)', () => {
    const result = trimLinesHelper(0, ['abc', 'def'], 6);
    expect(result).toEqual(['abc', 'def'])
});

test('all through (v2)', () => {
    const result = trimLinesHelper(0, ['abc', 'def'], 10);
    expect(result).toEqual(['abc', 'def'])
});

test('all through (v3)', () => {
    const result = trimLinesHelper(0, ['one', 'abc', 'def'], 8);
    expect(result).toEqual(['abc', 'def'])
});

test('too short (v1)', () => {
    const result = trimLinesHelper(0, ['abc', 'def'], 5);
    expect(result).toEqual(['def'])
});

test('too short (v2)', () => {
    const result = trimLinesHelper(1, ['abc', 'def'], 6);
    expect(result).toEqual(['def'])
});