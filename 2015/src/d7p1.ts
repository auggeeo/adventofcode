import { input } from './inputs/d7';

// this ones pretty horrible because my brain was dying on this one lmao.

let output: number = 0;

let instructions: Record<string, number | undefined> = {};

let allvars: string[] = [];

function toUInt16(value: number): number {
  return (value & 0xffff) as number;
}

function run() {
  for (let instruction of input.split(/(?:\r*\n+)+/)) {
    let instructionList: string[] = instruction.split(/\W+/);
    if (instructionList.length < 1) {
      throw new Error(
        'why is the instruction list lower than one vro what????',
      );
    }

    let setToValue: number | undefined = 0;

    if (!allvars.includes(instructionList[instructionList.length - 1]!))
      allvars.push(instructionList[instructionList.length - 1]!);

    // no operations
    if (instructionList.length == 2) {
      let num = parseInt(instructionList[0]!);
      if (!Number.isNaN(num)) {
        setToValue = toUInt16(num);
      } else {
        if (!allvars.includes(instructionList[0]!))
          allvars.push(instructionList[0]!);
        if (instructions[instructionList[0]!] == undefined) continue;
        setToValue = toUInt16(instructions[instructionList[0]!]!);
      }
    }

    // Not values
    if (instructionList.length == 3) {
      if (instructionList[0] == 'NOT') {
        let num = parseInt(instructionList[1]!);
        if (!Number.isNaN(num)) {
          setToValue = ~toUInt16(num);
        } else {
          if (!allvars.includes(instructionList[1]!))
            allvars.push(instructionList[1]!);
          if (instructions[instructionList[1]!] == undefined) continue;
          setToValue = ~toUInt16(instructions[instructionList[1]!]!);
        }
      } else {
        console.error(
          'i dont recognize this',
          instructionList[0],
          'whole thing is',
          instructionList,
        );
      }
    }

    // rshift, and, or, lshift
    if (instructionList.length == 4) {
      let num1 = parseInt(instructionList[0]!);
      let num2 = parseInt(instructionList[2]!);

      let input1 = toUInt16(
        !Number.isNaN(num1) ? num1 : instructions[instructionList[0]!]!,
      );
      let operation = instructionList[1];
      let input2 = toUInt16(
        !Number.isNaN(num2) ? num2 : instructions[instructionList[2]!]!,
      );

      if (Number.isNaN(num1) && !allvars.includes(instructionList[0]!))
        allvars.push(instructionList[0]!);
      if (Number.isNaN(num2) && !allvars.includes(instructionList[2]!))
        allvars.push(instructionList[2]!);

      if (
        (Number.isNaN(num1) &&
          instructions[instructionList[0]!] == undefined) ||
        (Number.isNaN(num2) && instructions[instructionList[2]!] == undefined)
      )
        continue;

      switch (operation) {
        case 'AND':
          setToValue = toUInt16(input1 & input2);
          break;
        case 'OR':
          setToValue = toUInt16(input1 | input2);
          break;
        case 'RSHIFT':
          setToValue = toUInt16(input1 >> input2);
          break;
        case 'LSHIFT':
          setToValue = toUInt16(input1 << input2);
          break;
      }
    }

    
    instructions[instructionList[instructionList.length - 1] as string] =
      toUInt16(setToValue);
  }
}

run();

function keepgoing(): number {
  let count = 0;
  for (let v of allvars) {
    if (instructions[v] != undefined) count++;
  }
  return count;
}

while (keepgoing() < allvars.length) {
  run();
  console.log(
    `${String(keepgoing()).padStart(allvars.length.toString().length)}/${allvars.length}`,
  );
}
output = instructions['a']!;

console.log(`a is equal to ${output}.`);
