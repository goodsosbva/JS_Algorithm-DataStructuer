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
  const [n, r, c] = input.split(" ");

  console.log(recursive(n, r, c));
}

function recursive(n, r, c) {
  if (n == 0) return 0;

  const half = 1 << (n - 1);

  if (r < half && c < half) return recursive(n - 1, r, c);
  else if (r < half && c >= half)
    return half * half + recursive(n - 1, r, c - half);
  else if (r >= half && c < half)
    return 2 * half * half + recursive(n - 1, r - half, c);
  else return 3 * half * half + recursive(n - 1, r - half, c - half);
}
