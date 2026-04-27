const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  let idx = 0;
  const next = () => input[idx++];

  const n = Number(next());

  let checkers = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = next().split(" ").map(Number);
    checkers.push([x, y]);
  }

  console.log(solution(n, checkers));
  process.exit(0);
});

function solution(n, checkers) {
  let answer = Array(n).fill(Infinity);

  let checkers_x = [];
  let checkers_y = [];

  for (const [x, y] of checkers) {
    checkers_x.push(x);
    checkers_y.push(y);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cur_x = checkers_x[i];
      const cur_y = checkers_y[j];

      let distances = [];
      for (let k = 0; k < n; k++) {
        let distance =
          Math.abs(cur_x - checkers[k][0]) + Math.abs(cur_y - checkers[k][1]);
        distances.push(distance);
      }

      const sorted_diss = [...distances].sort((a, b) => a - b);

      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += sorted_diss[k];
        answer[k] = Math.min(answer[k], sum);
      }
    }
  }

  return answer.join(" ");
}
