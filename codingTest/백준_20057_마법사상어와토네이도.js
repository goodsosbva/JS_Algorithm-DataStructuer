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
  const n = Number(input[0]);

  const maps = [];
  for (let i = 1; i <= n; i++) {
    const map = input[i].split(" ").map(Number);
    maps.push(map);
  }

  const result = solution(n, maps);
  console.log(result);
  process.exit(0);
});

const BASE_LEFT = [
  { dr: -1, dc: 1, p: 1 },
  { dr: 1, dc: 1, p: 1 },

  { dr: -1, dc: 0, p: 7 },
  { dr: 1, dc: 0, p: 7 },

  { dr: -2, dc: 0, p: 2 },
  { dr: 2, dc: 0, p: 2 },

  { dr: -1, dc: -1, p: 10 },
  { dr: 1, dc: -1, p: 10 },

  { dr: 0, dc: -2, p: 5 },

  { dr: 0, dc: -1, p: -1 },
];

function spread(maps, n, r, c, dir) {
  const sand = maps[r][c];

  if (sand === 0) return 0;

  maps[r][c] = 0;

  let used = 0;
  let out = 0;

  for (const { dr, dc, p } of BASE_LEFT) {
    let rr, cc;

    if (dir === 0) {
      rr = dr;
      cc = dc;
    } else if (dir === 1) {
      rr = -dc;
      cc = dr;
    } else if (dir === 2) {
      rr = -dr;
      cc = -dc;
    } else if (dir === 3) {
      rr = dc;
      cc = -dr;
    }

    const nr = r + rr;
    const nc = c + cc;

    let amount;
    if (p === -1) amount = sand - used;
    else {
      amount = Math.floor((sand * p) / 100);
      used += amount;
    }

    if (nr < 0 || nr >= n || nc < 0 || nc >= n) out += amount;
    else maps[nr][nc] += amount;
  }

  return out;
}

function solution(n, maps) {
  let answer = 0;
  let r = Math.floor(n / 2);
  let c = Math.floor(n / 2);

  const dr = [0, 1, 0, -1];
  const dc = [-1, 0, 1, 0];

  let step = 1;
  let dir = 0;
  let moved = 0;
  const totalMoves = n * n - 1;

  while (moved < totalMoves) {
    for (let repeat = 0; repeat < 2; repeat++) {
      for (let k = 0; k < step; k++) {
        r += dr[dir];
        c += dc[dir];
        moved++;

        const out = spread(maps, n, r, c, dir);
        answer += out;

        if (moved === totalMoves) return answer;
      }
      dir = (dir + 1) & 3;
    }
    step++;
  }

  return answer;
}
