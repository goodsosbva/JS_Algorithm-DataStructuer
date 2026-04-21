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
  let idx = 0;
  const next = () => input[idx++];
  const n = Number(next());
  const m = Number(next());
  const passwords = next().split(" ").map(Number);

  const result = solution(n, m, passwords);
  console.log(result);
  process.exit(0);
});

function solution(n, m, passwords) {
  let answer = 0;
  const q = new Int32Array(n + 1);
  const visited = new Int32Array(n + 1).fill(-1);

  let st = 0;
  let end = 0;

  for (const pw of passwords) {
    if (visited[pw] !== -1) continue;
    visited[pw] = 0;
    q[end++] = pw;
  }

  while (st < end) {
    const cur = q[st++];
    const curDist = visited[cur];

    answer = Math.max(answer, curDist);

    for (let bit = 0; bit <= 20; bit++) {
      const next_n = cur ^ (1 << bit);

      if (next_n > n) continue;
      if (visited[next_n] !== -1) continue;

      q[end++] = next_n;
      visited[next_n] = curDist + 1;
    }
  }

  return answer;
}
