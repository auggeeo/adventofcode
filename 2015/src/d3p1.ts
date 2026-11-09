import { input } from './inputs/d3';

let output: number = 0;

let x = 0;
let y = 0;

let presentsDeliveredIndex: Record<string, number> = {
  '0-0': 1,
};

for (let char of input) {
  switch (char) {
    case '^':
      y++;
      break;
    case 'v':
      y--;
      break;
    case '>':
      x++;
      break;
    case '<':
      x--;
      break;
  }

  if (presentsDeliveredIndex[x.toString() + '-' + y.toString()] == undefined)
    presentsDeliveredIndex[x.toString() + '-' + y.toString()] = 0;

  // @ts-ignore
  presentsDeliveredIndex[x.toString() + '-' + y.toString()] += 1;
}

output = Object.values(presentsDeliveredIndex).length;

console.log('Houses that were delivered to at least once: ' + output);
