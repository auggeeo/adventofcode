import { input } from './inputs/d3';

let output: number = 0;

let sx = 0;
let sy = 0;
let rx = 0;
let ry = 0;
let roboSantaMove = false;

let presentsDeliveredIndex: Record<string, number> = {
  '0-0': 2,
};

for (let char of input) {
  let x: number = roboSantaMove ? rx : sx;
  let y: number = roboSantaMove ? ry : sy;
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
  presentsDeliveredIndex[x.toString() + '-' + y.toString()]  += 1;

  if (roboSantaMove) {
    rx = x;
    ry = y;
  } else {
    sx = x;
    sy = y;
  }

  roboSantaMove = !roboSantaMove;
}

output = Object.values(presentsDeliveredIndex).length;

console.log(
  'Houses that were delivered to at least once (with robosanta taking turns): ' + output,
);
