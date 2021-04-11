import {
  RotateDirection,
  CommandFunction,
  GridState,
  GridCommand
} from './types';

import {
  commandMoveBy,
  commandRotate
} from './commands';

export function getNextState(currentState: GridState, command: GridCommand): GridState {
  if (!command) throw new Error('no command');

  const [cmd, val] = command;

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

export function getFinalState(commands: GridCommand[], initialState: GridState) {
  return commands.reduce(getNextState, initialState);
}


