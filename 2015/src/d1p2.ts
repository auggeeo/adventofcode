import { input } from './inputs/d1';

let floor: number = 0;
let output: number = 0;

for (let char of input) {
  floor += (char == '(' && 1) || (char == ')' && -1) || 0;
  output++;
  if (floor < 0) break;
}

console.log(
  `The instruction number ${output} is where it should take santa to the basement. The floor number output ${floor}`,
);
