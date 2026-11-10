import { input } from './inputs/d5';

let output: number = 0;

for (let string of input
  .split(/\W+/)
  .filter((str) => !str.match(/(ab|cd|pq|xy)/))) {
  let safeString = false;
  let vowels = 0;
  let lastChar = '';
  let sameLetterAppearsTwice = false;
  for (let char of string) {
    vowels += char.match(/^(a|e|i|o|u)$/) == null ? 0 : 1;

    if (!sameLetterAppearsTwice && lastChar != '' && lastChar == char) {
      sameLetterAppearsTwice = true;
    }

    lastChar = char;
  }

  safeString = vowels > 2 && sameLetterAppearsTwice;

  output += (safeString && 1) || 0;
}

console.log(`The total amount of safe strings are ${output}.`);
