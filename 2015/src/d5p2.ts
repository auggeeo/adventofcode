import { input } from './inputs/d5';

let output: number = 0;

for (let string of input.split(/\W+/)) {
  let safeString = false;
  let rule1 = false; // It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
  let rule2 = false; // It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.

  let rule1OverrideToBad = false;

  let twoCharIndex: string[] = [];
  let threeCharIndex: string[] = [];

  for (let char of string) {
    // vowels += char.match(/^(a|e|i|o|u)$/) == null ? 0 : 1;
    if (threeCharIndex.length != 0) {
      threeCharIndex[threeCharIndex.length - 1] += char;
    }
    if (threeCharIndex.length != 1) {
      threeCharIndex[threeCharIndex.length - 2] += char;
    }

    if (twoCharIndex.length != 0) {
      twoCharIndex[twoCharIndex.length - 1] += char;
    }

    twoCharIndex.push(char);
    threeCharIndex.push(char);
  }

  twoCharIndex.pop();
  threeCharIndex = threeCharIndex.filter((v) => v.length == 3);

  for (let twoChar of twoCharIndex) {
    let matches = twoCharIndex.filter((v) => v == twoChar).length;

    if (matches > 1) {
      rule1 = true;
    }
  }

  for (let threeChar of threeCharIndex) {
    if (threeChar[0] == threeChar[2]) {
      rule2 = true;
    }
    if (
      threeChar[0] == threeChar[2] &&
      threeChar[0] == threeChar[1] &&
      threeCharIndex.filter((v) => v == threeChar).length == 1
    ) {
      rule1OverrideToBad = true;
    }
  }

  safeString = rule1 && rule1OverrideToBad == false && rule2;

  output += (safeString && 1) || 0;
}

console.log(`The total amount of safe strings are ${output}.`);
