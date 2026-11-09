import { input } from './inputs/d4';

let index: number = 0;

const hasher = new Bun.CryptoHasher('md5');

while (true) {
  hasher.update(input + index.toString());

  const result = hasher.digest('hex');

  if (result.startsWith('00000')) {
    console.log(
      'Success! we found a number:',
      index,
      `(input: ${input}, output: ${result})`,
    );
    break;
  }

  index++;
}
