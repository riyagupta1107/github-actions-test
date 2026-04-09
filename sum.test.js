const sum = require('./sum')

test('adds 1 and 2', () => {
    expect(sum(1,2)).toBe(3);
});