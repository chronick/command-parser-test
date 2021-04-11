
// Default grid size
export const GRID_SIZE = 100;

// Definition of the language itself, which is a collection of (<command>,<argument>) pairs
// concatenated in a string with no other delimiter.
//
// Per the specificiation, the commands are:
// M: Move forward
// L: Turn left
// R: Turn right
//
// Each command can include a numeric argument of 1-100.
// If the argument is omitted, it is assumed to default to '1'.
export const VOCAB_RE = /(M|R|L)(\d*)/;
