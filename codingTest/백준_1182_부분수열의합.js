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

var answer = 0;
function solution(input) {
  const [n, s] = input[0].split(" ").map(Number);
  const numbers = input[1].split(" ").map(Number);

  console.log(numbers);

  recursive(0, 0, s, n, numbers);
  if (s === 0) answer -= 1;
  console.log(answer);
}

function recursive(cur, sum, s, n, numbers) {
  if (cur === n) {
    if (sum === s) answer += 1;
    return;
  }

  recursive(cur + 1, sum, s, n, numbers);
  recursive(cur + 1, sum + numbers[cur], s, n, numbers);
}
