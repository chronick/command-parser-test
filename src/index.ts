const VOCAB_RE = /(M|R|L)(\d*)/;
const GRID_SIZE = 100;

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

type GridState = [CardinalDirection, number, number];
type GridCommand = [CommandFunction, string]


export function wrap(val: number, max: number = GRID_SIZE, min: number = 0) {
  return ((val % max) + max) % max;
}

export function commandMoveBy(state: GridState, val: number) : GridState {
  const [direction, x, y] = state;

  if (direction === CardinalDirection.N) {
    return [direction, x, wrap(y + val)];
  }

  if (direction === CardinalDirection.S) {
    return [direction, x, wrap(y - val)];
  }

  if (direction === CardinalDirection.E) {
    return [direction, wrap(x + val), y];
  }

  if (direction === CardinalDirection.W) {
    return [direction, wrap(x - val), y];
  }

  throw new Error(`Unknown direction: ${direction}`);
}

export function commandRotate([direction, x, y] : GridState, val : number) : GridState {
  return [wrap(direction + val, (Object.keys(CardinalDirection).length / 2)), x, y];
}

export function getNextState(currentState: GridState, command: GridCommand) : GridState {
      if (!command) throw new Error('no command');

      const [cmd, valStr] = command;
      const val = valStr == "" ? 1 : parseInt(valStr, 10);
      if (isNaN(val)) throw new Error(`Parse error of int value: ${valStr}`);

      if (cmd === CommandFunction.M) {
        return commandMoveBy(currentState, val);
      }

      if (cmd === CommandFunction.R) {
        return commandRotate(currentState, RotateDirection.RIGHT * val);
      }

      if (cmd === CommandFunction.L) {
        return commandRotate(currentState, RotateDirection.LEFT * val);
      }

      return currentState;
}

export function getFinalState(initialStateStr: string, commandStr: string) : string {
  const [dir, x, y] = initialStateStr.split(" ");
  const initialState : GridState = [
    CardinalDirection[dir as keyof typeof CardinalDirection],
    parseInt(x, 10),
    parseInt(y, 10),
  ];

  const match = commandStr
    .match(new RegExp(VOCAB_RE.source, "g"));

  if (!match) throw new Error('Unable to parse command string');

  const finalState = match
    .map((cmd) : GridCommand => {
      const match = cmd.match(VOCAB_RE);
      if (match) return [match[1] as CommandFunction, match[2] as string];
      throw new Error('Unable to parse command');
    })
    .reduce(getNextState, initialState);

  return [CardinalDirection[finalState[0]], finalState[1], finalState[2]].join(" ");
}
