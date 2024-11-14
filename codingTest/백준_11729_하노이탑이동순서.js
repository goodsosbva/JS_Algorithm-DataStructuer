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
  const result = solution(input);
  console.log(result);
  process.exit(0);
});

function solution(input) {
  const k = parseInt(input);
  console.log(k);
  console.log(2 ** k - 1);
  recursive(1, 3, k);
}

function recursive(a, b, n) {
  if (n === 1) {
    console.log(a + " " + b);
    return;
  }

  recursive(a, 6 - a - b, n - 1);
  console.log(a + " " + b);
  recursive(6 - a - b, b, n - 1);
}
