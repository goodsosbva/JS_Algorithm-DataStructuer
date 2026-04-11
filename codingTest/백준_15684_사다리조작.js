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
  const [n, m, h] = next().split(" ").map(Number);

  const garos = [];
  for (let i = 0; i < m; i++) {
    const [a, b] = next().split(" ").map(Number);
    garos.push([a, b]);
  }

  const answer = solution(n, m, h, garos);
  console.log(answer);
  process.exit(0);
});

function solution(n, m, h, garos) {
  let answer = 4;

  const ladder = Array.from({ length: h }, () => Array(n - 1).fill(false));
  for (const garo of garos) {
    const [a, b] = garo;
    ladder[a - 1][b - 1] = true;
  }

  function isValid() {
    for (let st = 0; st < n; st++) {
      let start = st;

      for (let r = 0; r < h; r++) {
        if (start < n - 1 && ladder[r][start]) start += 1;
        else if (start > 0 && ladder[r][start - 1]) start -= 1;
      }

      if (start !== st) return false;
    }

    return true;
  }

  function isCan(r, c) {
    if (ladder[r][c]) return false;
    if (c > 0 && ladder[r][c - 1]) return false;
    if (c < n - 2 && ladder[r][c + 1]) return false;

    return true;
  }

  function dfs(cnt, st_r, st_c) {
    if (isValid()) {
      answer = Math.min(answer, cnt);
      return;
    }

    if (cnt === 3) return;
    if (cnt >= answer) return;

    for (let r = st_r; r < h; r++) {
      const c_st = r === st_r ? st_c : 0;

      for (let c = c_st; c < n - 1; c++) {
        if (!isCan(r, c)) continue;
        ladder[r][c] = true;
        dfs(cnt + 1, r, c + 1);
        ladder[r][c] = false;
      }
    }
  }

  dfs(0, 0, 0);
  answer = answer > 3 ? -1 : answer;

  return answer;
}
