import {
  wrap
} from './util';

describe(wrap.name, () => {
  test('returns value if between min and max', () => {
    expect(wrap(1, 2)).toEqual(1);
    expect(wrap(4, 5)).toEqual(4);
  })

  test('wraps below min (0)', () => {
    expect(wrap(-1, 2)).toEqual(1);
    expect(wrap(-1, 100)).toEqual(99);
  })

  test('wraps numbers above max', () => {
    expect(wrap(5, 4)).toEqual(1);
    expect(wrap(2, 2)).toEqual(0);
    expect(wrap(101, 100)).toEqual(1);
  })
})
