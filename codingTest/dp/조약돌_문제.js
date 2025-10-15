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
  const arr = JSON.parse(input);
  const result = solution(arr);
  console.log(result);
  process.exit(0);
});

function solution(arr) {
  const n = arr[0].length;
  const dp = Array.from({ length: 4 }, () => Array(n).fill(0));

  dp[0][0] = arr[0][0];
  dp[1][0] = arr[1][0];
  dp[2][0] = arr[2][0];
  dp[3][0] = arr[0][0] + arr[2][0];

  for (let i = 1; i < n; i++) {
    dp[0][i] = arr[0][i] + Math.max(dp[1][i - 1], dp[2][i - 1]);
    dp[1][i] = arr[1][i] + Math.max(dp[0][i - 1], dp[2][i - 1], dp[3][i - 1]);
    dp[2][i] = arr[2][i] + Math.max(dp[0][i - 1], dp[1][i - 1]);
    dp[3][i] = arr[0][i] + arr[2][i] + dp[1][i - 1];
  }

  return Math.max(...dp.map((row) => row[n - 1]));
}
