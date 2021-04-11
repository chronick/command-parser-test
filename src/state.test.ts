import {
  getNextState,
} from './state';

import {
  CardinalDirection,
  CommandFunction,
} from './types';

const { N, E, W } = CardinalDirection;
const { M, R, L } = CommandFunction;

describe(getNextState.name, () => {
  test('default params', () => {
    expect(getNextState([N, 0, 0], [M, 1])).toEqual([N, 0, 1])
    expect(getNextState([N, 0, 0], [L, 1])).toEqual([W, 0, 0]);
    expect(getNextState([N, 0, 0], [R, 1])).toEqual([E, 0, 0]);
  })
})
