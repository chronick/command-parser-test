import fs from 'fs';
import {
  getFinalState
} from './state';

import {
  CardinalDirection,
  GridState,
  GridCommand,
  CommandFunction
} from './types';

import {
  VOCAB_RE
} from './config';


export function getFinalPosition(initialStateStr: string, commandStr: string): string {
  // create initial state array
  const [dir, x, y] = initialStateStr.split(" ");
  const initialState: GridState = [
    CardinalDirection[dir as keyof typeof CardinalDirection],
    parseInt(x, 10),
    parseInt(y, 10),
  ];

  // get array of full command strings from input
  const match = commandStr
    .match(new RegExp(VOCAB_RE.source, "g"));

  if (!match) throw new Error('Unable to parse command string');

  // convert commands into GridCommand[] type
  const commands = match
    .map((command): GridCommand => {
      // reapply the regex, but this time include all capture groups to parse out the command + argument
      const match = command.match(VOCAB_RE);
      if (!match) throw new Error('Unable to parse command');

      const [_c, cmd, valStr] = match;
      const val = valStr == "" ? 1 : parseInt(valStr, 10);
      if (isNaN(val)) throw new Error(`Parse error of int value: ${valStr}`);

      return [cmd as CommandFunction, val];
    })

  const finalState = getFinalState(commands, initialState);

  return [CardinalDirection[finalState[0]], finalState[1], finalState[2]].join(" ");
}
