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
  console.log(result);
  process.exit(0);
});

function solution(input) {
    const a = input[0].length;
    const b = input[1].length;
    const c = input[2].length;
    
    const str_a = input[0];
    const str_b = input[1];
    const str_c = input[2];
    
    const dp = Array.from({ length: a + 1 }, () =>
    Array.from({ length: b + 1 }, () =>
         Array(c + 1).fill(0)
        )
    );

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            for (let k = 1; k <= c; k++) {
                if (str_a[i - 1] === str_b[j - 1] && str_b[j - 1] === str_c[k - 1]) {
                    dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
                } else {
                    dp[i][j][k] = Math.max(
                        dp[i - 1][j][k],
                        dp[i][j - 1][k],
                        dp[i][j][k - 1]
                    );
                }
            }
        }
    }
    
    return dp[a][b][c];
}
