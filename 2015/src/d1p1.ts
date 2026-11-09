import { input } from './inputs/d1';

let output: number = 0;

for (let char of input) {
  output += (char == '(' && 1) || (char == ')' && -1) || 0;
}

console.log(`The floor ${output} is where it should take santa.`);
