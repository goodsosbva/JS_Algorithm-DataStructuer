function solution(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);

  if (x < y) {
    [x, y] = [y, x];
  }

  if (x === 0 && y === 0) return 0;
  if (x === 1 && y === 0) return 3;
  if (x === 2 && y === 2) return 4;
  if (x === 1 && y === 1) return 2;
  if (x === 2 && y === 0) return 2;
  if (x === 0 && y === 2) return 2;
  if (x === 1 && y === 2) return 1;

  const step1 = Math.floor((x + 1) / 2);
  const step2 = Math.floor((x + y + 2) / 3);
  let ans = Math.max(step1, step2);

  if (ans % 2 !== (x + y) % 2) {
    ans += 1;
  }

  return ans;
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (line === "END") {
    rl.close();
    return;
  }
  const [x, y] = line.split(" ").map(Number);
  console.log(solution(x, y));
});
