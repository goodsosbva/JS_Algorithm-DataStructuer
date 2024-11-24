const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  solution(input);
  process.exit(0);
});

function solution(input) {
  const [n, m] = input[0].split(" ").map(Number);
  const numbers = input[1].split(" ").map(Number);
  // const isUsed = Array.from({ length: n }, (_, index) => 0);
  const arr = Array.from({ length: m }, (_, index) => 0);
  const answer = [];

  numbers.sort((a, b) => {
    return a - b;
  });

  recursive(0, n, m, arr, numbers, answer);

  console.log(answer.join("\n"));
}

function recursive(k, n, m, arr, numbers, answer) {
  if (k == m) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = 0; i < numbers.length; i++) {
    arr[k] = numbers[i];
    recursive(k + 1, n, m, arr, numbers, answer);
  }
}
