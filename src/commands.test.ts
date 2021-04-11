import {
  commandMoveBy,
  commandRotate
} from './commands';

import {
  CardinalDirection,
  RotateDirection
} from './types';

const { N, E, S, W } = CardinalDirection;
const { RIGHT, LEFT } = RotateDirection;

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
