import fs from 'fs';
import { getFinalPosition } from './parser';

function parseFile(path: string) {
  fs.readFile(path, 'utf-8', (err, file) => {
    if (err) throw new Error("Unable to read file");
    const args = file.split('\n');

    if (args.length !== 2) {
      throw new Error('Invalid file structure.');
    }

    const [initialStateStr, commandStr] = args;

    const finalPosition = getFinalPosition(initialStateStr, commandStr);

    console.log(`Final position is: ${finalPosition}`);
  });
}

parseFile(process.argv[2]);