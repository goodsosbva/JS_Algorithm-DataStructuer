const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = "";

rl.on("line", (line) => {
  input += line + "\n";
});

rl.on("close", () => {
  const result = solution(input);
  console.log(result);
  process.exit(0);
});

function solution(input) {
  let answer = 0;

  let inputArr = input.slice(1).trim().split("\n");
  let numerInput = inputArr.map(Number);

  const n = numerInput.length;
  for (let i = n - 2; i >= 0; i--) {
    while (numerInput[i] >= numerInput[i + 1]) {
      numerInput[i] -= 1;
      answer += 1;
    }
  }
  return answer;
}
