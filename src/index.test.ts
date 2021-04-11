import { getFinalPosition } from './index';

describe(getFinalPosition.name, () => {
  test('default params', () => {
    expect(getFinalPosition("N 0 0", "M1RM4L3M2")).toEqual("S 4 99");
  })
})