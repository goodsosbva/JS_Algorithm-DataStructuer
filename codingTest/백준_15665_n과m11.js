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
  const numbers = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const arr = Array.from({ length: m }, () => 0);
  const answer = new Set();

  recursive(0, m, numbers, arr, answer);

  console.log([...answer].join("\n"));
}

function recursive(k, m, numbers, arr, answer) {
  if (k === m) {
    answer.add(arr.join(" "));
    return;
  }

  for (let i = 0; i < numbers.length; i++) {
    arr[k] = numbers[i];
    recursive(k + 1, m, numbers, arr, answer);
  }
}
