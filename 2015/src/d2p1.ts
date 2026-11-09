import { input } from './inputs/d2';

let output: number = 0;

for (let box of input.split(/\W+/)) {
  let boxDims = box.split('x');
  let length = Number(boxDims[0]);
  let width = Number(boxDims[1]);
  let height = Number(boxDims[2]);

  let side1 = length * width;
  let side2 = length * height;
  let side3 = height * width;

  let boxSurfaceArea = 2 * (side1 + side2 + side3);

  if (side1 <= side2 && side1 <= side3) {
    boxSurfaceArea += side1;
  } else if (side2 <= side1 && side2 <= side3) {
    boxSurfaceArea += side2;
  } else if (side3 <= side2 && side3 <= side1) {
    boxSurfaceArea += side3;
  }

  output += boxSurfaceArea;
}

console.log(`The total surface area for all the boxes are ${output}.`);
