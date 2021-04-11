
export enum CardinalDirection {
  N = 0,
  E = 1,
  S = 2,
  W = 3
}

export enum RotateDirection {
  RIGHT = 1,
  LEFT = -1
}

export enum CommandFunction {
  M = 'M',
  R = 'R',
  L = 'L'
}

export type GridState = [CardinalDirection, number, number];
export type GridCommand = [CommandFunction, number];
