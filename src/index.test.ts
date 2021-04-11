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

describe(wrap.name, () => {
  test('returns value if between min and max', () => {
    expect(wrap(1, 2, 0)).toEqual(1);
    expect(wrap(4, 5, 3)).toEqual(4);
  })

  test('wraps below min', () => {
    expect(wrap(-1)).toEqual(99);
    expect(wrap(-1, 2, 0)).toEqual(1);
    expect(wrap(-1, 100, 0)).toEqual(99);
    expect(wrap(1, 100, 2)).toEqual(99);
  })

  test('wraps numbers above max', () => {
    expect(wrap(100)).toEqual(0);
    expect(wrap(2, 2, 0)).toEqual(0);
    expect(wrap(101, 100, 0)).toEqual(1);
    expect(wrap(101, 100, 2)).toEqual(3);
  })
})

const { N, E, S, W } = CardinalDirection;
const { M, R, L } = CommandFunction;
const { RIGHT, LEFT } = RotateDirection;

describe(commandMoveBy.name, () => {
  test('default params', () => {
    expect(commandMoveBy([CardinalDirection.N, 0, 0], 1)).toEqual([CardinalDirection.N, 0, 1]);
    expect(commandMoveBy([CardinalDirection.E, 0, 0], 1)).toEqual([CardinalDirection.E, 1, 0]);
    expect(commandMoveBy([CardinalDirection.S, 0, 0], 1)).toEqual([CardinalDirection.S, 0, 99]);
    expect(commandMoveBy([CardinalDirection.W, 0, 0], 1)).toEqual([CardinalDirection.W, 99, 0]);
  })
})

describe(commandRotate.name, () => {
  test('Rotate Right', () => {
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.RIGHT)).toEqual([CardinalDirection.E, 0, 0]);
    expect(commandRotate([CardinalDirection.E, 0, 0], RotateDirection.RIGHT)).toEqual([CardinalDirection.S, 0, 0]);
    expect(commandRotate([CardinalDirection.S, 0, 0], RotateDirection.RIGHT)).toEqual([CardinalDirection.W, 0, 0]);
    expect(commandRotate([CardinalDirection.W, 0, 0], RotateDirection.RIGHT)).toEqual([CardinalDirection.N, 0, 0]);
  })

  test('Rotate Right Multiplied', () => {
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.RIGHT * 2)).toEqual([CardinalDirection.S, 0, 0]);
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.RIGHT * 3)).toEqual([CardinalDirection.W, 0, 0]);
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.RIGHT * 4)).toEqual([CardinalDirection.N, 0, 0]);
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.RIGHT * 5)).toEqual([CardinalDirection.E, 0, 0]);
  })

  test('Rotate Left', () => {
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT)).toEqual([CardinalDirection.W, 0, 0]);
    expect(commandRotate([CardinalDirection.E, 0, 0], RotateDirection.LEFT)).toEqual([CardinalDirection.N, 0, 0]);
    expect(commandRotate([CardinalDirection.S, 0, 0], RotateDirection.LEFT)).toEqual([CardinalDirection.E, 0, 0]);
    expect(commandRotate([CardinalDirection.W, 0, 0], RotateDirection.LEFT)).toEqual([CardinalDirection.S, 0, 0]);
  })

  test('Rotate Left Multiplied', () => {
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT * 2)).toEqual([CardinalDirection.S, 0, 0]);
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT * 3)).toEqual([CardinalDirection.E, 0, 0]);
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT * 4)).toEqual([CardinalDirection.N, 0, 0]);
    console.log(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT * 5));
    expect(commandRotate([CardinalDirection.N, 0, 0], RotateDirection.LEFT * 5)).toEqual([CardinalDirection.W, 0, 0]);
  })
})

describe(getNextState.name, () => {
  test('default params', () => {
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.M, '1'])).toEqual([CardinalDirection.N, 0, 1])
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.L, '1'])).toEqual([CardinalDirection.W, 0, 0]);
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.R, '1'])).toEqual([CardinalDirection.E, 0, 0]);
  })
  test('blank value', () => {
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.M, ''])).toEqual([CardinalDirection.N, 0, 1])
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.L, ''])).toEqual([CardinalDirection.W, 1, 0]);
    expect(getNextState([CardinalDirection.N, 0, 0], [CommandFunction.R, ''])).toEqual([CardinalDirection.E, 0, 0]);
  })
})