import {
  wrap,
  commandMoveBy,
  commandRotate,
  getNextState,
  getFinalState,
  CardinalDirection,
  RotateDirection,
  CommandFunction,
} from './index';

const { N, E, S, W } = CardinalDirection;
const { M, R, L } = CommandFunction;
const { RIGHT, LEFT } = RotateDirection;

describe(wrap.name, () => {
  test('returns value if between min and max', () => {
    expect(wrap(1, 2, 0)).toEqual(1);
    expect(wrap(4, 5, 3)).toEqual(4);
  })

  test('wraps below min', () => {
    expect(wrap(-1, 2, 0)).toEqual(1);
    expect(wrap(-1, 100, 0)).toEqual(99);
  })

  test('wraps numbers above max', () => {
    expect(wrap(5, 4)).toEqual(1);
    expect(wrap(2, 2, 0)).toEqual(0);
    expect(wrap(101, 100, 0)).toEqual(1);
  })
})

describe(commandMoveBy.name, () => {
  test('default params', () => {
    expect(commandMoveBy([N, 0, 0], 1)).toEqual([N, 0, 1]);
    expect(commandMoveBy([E, 0, 0], 1)).toEqual([E, 1, 0]);
    expect(commandMoveBy([S, 0, 0], 1)).toEqual([S, 0, 99]);
    expect(commandMoveBy([W, 0, 0], 1)).toEqual([W, 99, 0]);
  })
})

describe(commandRotate.name, () => {
  test('Rotate Right', () => {
    expect(commandRotate([N, 0, 0], RIGHT)).toEqual([E, 0, 0]);
    expect(commandRotate([E, 0, 0], RIGHT)).toEqual([S, 0, 0]);
    expect(commandRotate([S, 0, 0], RIGHT)).toEqual([W, 0, 0]);
    expect(commandRotate([W, 0, 0], RIGHT)).toEqual([N, 0, 0]);
  })

  test('Rotate Right Multiplied', () => {
    expect(commandRotate([N, 0, 0], RIGHT * 2)).toEqual([S, 0, 0]);
    expect(commandRotate([N, 0, 0], RIGHT * 3)).toEqual([W, 0, 0]);
    expect(commandRotate([N, 0, 0], RIGHT * 4)).toEqual([N, 0, 0]);
    expect(commandRotate([N, 0, 0], RIGHT * 5)).toEqual([E, 0, 0]);
  })

  test('Rotate Left', () => {
    expect(commandRotate([N, 0, 0], LEFT)).toEqual([W, 0, 0]);
    expect(commandRotate([E, 0, 0], LEFT)).toEqual([N, 0, 0]);
    expect(commandRotate([S, 0, 0], LEFT)).toEqual([E, 0, 0]);
    expect(commandRotate([W, 0, 0], LEFT)).toEqual([S, 0, 0]);
  })

  test('Rotate Left Multiplied', () => {
    expect(commandRotate([N, 0, 0], LEFT * 2)).toEqual([S, 0, 0]);
    expect(commandRotate([N, 0, 0], LEFT * 3)).toEqual([E, 0, 0]);
    expect(commandRotate([N, 0, 0], LEFT * 4)).toEqual([N, 0, 0]);
    expect(commandRotate([N, 0, 0], LEFT * 5)).toEqual([W, 0, 0]);
  })
})

describe(getNextState.name, () => {
  test('default params', () => {
    expect(getNextState([N, 0, 0], [M, '1'])).toEqual([N, 0, 1])
    expect(getNextState([N, 0, 0], [L, '1'])).toEqual([W, 0, 0]);
    expect(getNextState([N, 0, 0], [R, '1'])).toEqual([E, 0, 0]);
  })
  test('blank value', () => {
    expect(getNextState([N, 0, 0], [M, ''])).toEqual([N, 0, 1])
    expect(getNextState([N, 0, 0], [L, ''])).toEqual([W, 0, 0]);
    expect(getNextState([N, 0, 0], [R, ''])).toEqual([E, 0, 0]);
  })
})

describe(getFinalState.name, () => {
  test('default params', () => {
    expect(getFinalState("N 0 0", "M1RM4L3M2")).toEqual("S 4 99");
  })
})