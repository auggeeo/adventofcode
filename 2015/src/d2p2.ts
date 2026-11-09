import { input } from './inputs/d2';

let output: number = 0;

for (let box of input.split(/\W+/)) {
  let boxDims = box.split('x');
  let length = Number(boxDims[0]);
  let width = Number(boxDims[1]);
  let height = Number(boxDims[2]);

  let ribbon = 0;

  let oneSideLowest = 0; // idk how to name the variable lmao

  if (length <= width && length <= height) {
    ribbon += length;
    oneSideLowest = 1;
  } else if (height <= length && height <= width) {
    ribbon += height;
    oneSideLowest = 2;
  } else if (width <= length && width <= height) {
    ribbon += width;
    oneSideLowest = 3;
  }

  if ((length <= width || length <= height) && oneSideLowest != 1) {
    ribbon += length;
  } else if ((height <= length || height <= width) && oneSideLowest != 2) {
    ribbon += height;
  } else if ((width <= length || width <= height) && oneSideLowest != 3) {
    ribbon += width;
  }

  ribbon *= 2;
  ribbon += length * width * height;

  output += ribbon;
}

console.log(`The total feet of ribbon for all the boxes are ${output}.`);
