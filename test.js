import * as readline from 'node:readline/promises';

import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const answers = {}
for (let i = 0; i < 3; i++) {
  const answer = await rl.question('What do you think of Node.js? \na\nb\nc\n');
  Object.assign(answers, { [i]: answer });
}

console.log(`Thank you for your valuable feedback: ${JSON.stringify(answers)}`);

rl.close();