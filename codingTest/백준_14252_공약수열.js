const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  let idx = 0;
  const next = () => input[idx++];
  const n = Number(next());
  const numbers = next().split(" ").map(Number);

  const result = solution(n, numbers);
  console.log(result);
  process.exit(0);
});

function gcd(a, b) {
  while (b !== 0) {
    const tmp = b;
    b = a % b;
    a = tmp;
  }

  return a;
}

function isPrime(x) {}

function solution(n, numbers) {
  let answer = 0;
  const sorted_numbers = numbers.sort((a, b) => a - b);

  for (let i = 0; i < sorted_numbers.length - 1; i++) {
    const a = sorted_numbers[i];
    const b = sorted_numbers[i + 1];
    if (gcd(a, b) === 1) continue;

    let found = false;

    for (let x = a + 1; x < b; x++) {
      if (gcd(a, x) === 1 && gcd(x, b) === 1) {
        found = true;
        break;
      }
    }

    if (found) answer += 1;
    else answer += 2;
  }

  return answer;
}
