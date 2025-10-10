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
  console.log(result[0]);
  console.log(result[1]);
  process.exit(0);
});

function solution(input) {
  const m = input[0].length;
  const n = input[1].length;

  const str1 = input[0];
  const str2 = input[1];
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill([0, ""]));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = [dp[i - 1][j - 1][0] + 1, dp[i - 1][j - 1][1] + str1[i - 1]];
      } else {
        if (dp[i - 1][j][0] > dp[i][j - 1][0]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 1];
        }
      }
    }
  }

  return dp[m][n];
}
