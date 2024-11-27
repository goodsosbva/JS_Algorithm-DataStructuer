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
  const result = solution(input);
  console.log(result);
  process.exit(0);
});

function solution(input) {
  const [n, m] = input[0].split(" ").map(Number);
  const numbers = input[1].split(" ").map(Number);
  const arr = Array.from({ length: m }, () => 0);
  const answer = [];

  numbers.sort((a, b) => a - b);

  recursive(0, n, m, arr, numbers, answer, 0);

  return answer.join("\n");
}

function recursive(k, n, m, arr, numbers, answer, start) {
  if (k === m) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = start; i < numbers.length; i++) {
    arr[k] = numbers[i];
    recursive(k + 1, n, m, arr, numbers, answer, i);
  }
}
