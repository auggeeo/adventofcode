import { input } from './inputs/d6';

let output: number = 0;

let lights: Uint8Array = new Uint8Array(1000 * 1000);

let instructionIndex = 1;

for (let string of input.split(/\r*\n+/)) {
  let instruction = string.split(' ');
  if (instruction[0] == 'turn') instruction.shift();

  const typeOf = instruction[0]!;
  const firstSet = instruction[1]!.split(',')!.map((n) => parseInt(n));
  const secondSet = instruction[3]!.split(',')!.map((n) => parseInt(n));

  console.log(
    `on instruction ${instructionIndex.toString().padStart(3, '0')}/${input.split(/\r*\n+/).length} - setting ${firstSet} --> ${secondSet} to ${typeOf}`,
  );
  instructionIndex++;

  for (let index = firstSet[0]!; index <= secondSet[0]!; index++) {
    let offset = index * 1000;
    for (let index2 = firstSet[1]!; index2 <= secondSet[1]!; index2++) {
      let idx = offset + index2;
      switch (typeOf) {
        case 'on':
          lights[idx] = +true;
          break;
        case 'off':
          lights[idx] = +false;
          break;
        case 'toggle':
          lights[idx] = +!lights[idx];
          break;
      }
    }
  }
}

for (let light of lights) {
  output += light || 0;
}

console.log(`The total amount of lights on are ${output}.`);
