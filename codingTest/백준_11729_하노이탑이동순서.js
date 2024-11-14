const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = "";

rl.on("line", (line) => {
  input += line;
});

rl.on("close", () => {
  solution(input);
  process.exit(0);
});

function solution(input) {
  const k = parseInt(input);
  const result = [];
  console.log(2 ** k - 1);
  recursive(1, 3, k, result);

  console.log(result.join("\n"));
}

function recursive(a, b, n, result) {
  if (n === 1) {
    result.push(`${a} ${b}`);
    return;
  }

  recursive(a, 6 - a - b, n - 1, result);
  result.push(`${a} ${b}`);
  recursive(6 - a - b, b, n - 1, result);
}
