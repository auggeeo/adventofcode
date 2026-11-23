import { input } from './inputs/d3';

const pack = (x: number, y: number) => (x + 32768) * 65536 + (y + 32768);

const visited = new Set<number>([pack(0, 0)]);

let sx = 0, sy = 0, rx = 0, ry = 0;
let roboTurn = false;

for (let i = 0; i < input.length; i++) {
  let x = roboTurn ? rx : sx;
  let y = roboTurn ? ry : sy;

  switch (input.charCodeAt(i)) {
    case 94:  y++; break;
    case 118: y--; break;
    case 62:  x++; break;
    case 60:  x--; break;
  }

  visited.add(pack(x, y));

  if (roboTurn) { rx = x; ry = y; }
  else          { sx = x; sy = y; }

  roboTurn = !roboTurn;
}

console.log(
  `Houses that were delivered to at least once (with robosanta taking turns): ${visited.size}`,
);
