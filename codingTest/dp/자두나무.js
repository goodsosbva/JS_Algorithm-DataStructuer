const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const [T, W] = input[0].split(" ").map(Number);
  const trees = input.slice(1).map(Number);

  const result = solution(T, W, trees);
  console.log(result);
  process.exit(0);
});

function solution(t, w, trees) {
  const dp = Array.from({ length: t + 1 }, () => Array(w + 1).fill(0));

  for (i = 1; i <= t; i++) {
    for (let j = 0; j <= w; j++) {
      let nowTree = trees[i - 1];
      let pos = j % 2 === 0 ? 1 : 2;
      let stay = dp[i - 1][j];

      let move = j > 0 ? dp[i - 1][j - 1] : 0;

      dp[i][j] = Math.max(stay, move) + (nowTree === pos ? 1 : 0);
    }
  }

  return Math.max(...dp[t]);
}
