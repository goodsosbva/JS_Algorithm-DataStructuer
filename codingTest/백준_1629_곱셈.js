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
  const [a, b, c] = input[0].split(" ").map((num) => BigInt(num));

  const answer = multipRecursion(a, b, c);
  console.log(answer.toString());
  process.exit(0);
});

function multipRecursion(a, b, c) {
  if (b === 0n) return 1n;
  if (b === 1n) return a % c;

  let val = multipRecursion(a, b / 2n, c);

  val = (val * val) % c;

  if (b % 2n === 1n) {
    return (val * a) % c;
  }

  return val;
}
