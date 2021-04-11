import {
  CardinalDirection,
  GridState,
} from './types';

import { wrap } from './util';

import { GRID_SIZE } from './config';

export function commandMoveBy(state: GridState, val: number): GridState {
  const [direction, x, y] = state;

  if (direction === CardinalDirection.N) {
    return [direction, x, wrap(y + val, GRID_SIZE)];
  }

  if (direction === CardinalDirection.S) {
    return [direction, x, wrap(y - val, GRID_SIZE)];
  }

  if (direction === CardinalDirection.E) {
    return [direction, wrap(x + val, GRID_SIZE), y];
  }

  if (direction === CardinalDirection.W) {
    return [direction, wrap(x - val, GRID_SIZE), y];
  }

  throw new Error(`Unknown direction: ${direction}`);
}

export function commandRotate([direction, x, y]: GridState, val: number): GridState {
  return [wrap(direction + val, (Object.keys(CardinalDirection).length / 2)), x, y];
}
