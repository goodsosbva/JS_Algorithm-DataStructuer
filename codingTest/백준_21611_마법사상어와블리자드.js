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
  const [n, m] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < n; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const blizards = [];
  for (let j = 0; j < m; j++) {
    const [d, s] = next().split(" ").map(Number);
    blizards.push([d, s]);
  }

  const result = solution(n, m, maps, blizards);
  console.log(result);
  process.exit(0);
});

function makePath(n) {
  let path = [];
  const posToIdx = Array.from({ length: n }, () => Array(n).fill(-1));
  const center = Math.floor(n / 2);
  let r = center;
  let c = center;

  // 좌, 하, 우, 상
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let len = 1;
  let dir = 0;

  while (true) {
    for (let repeat = 0; repeat < 2; repeat++) {
      for (let step = 0; step < len; step++) {
        const nx = r + dx[dir];
        const ny = c + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
          return { path, posToIdx };
        }

        posToIdx[nx][ny] = path.length;
        path.push([nx, ny]);
        r = nx;
        c = ny;
      }
      dir = (dir + 1) % 4;
    }
    len++;
  }
}

function compress(beads) {
  return beads.filter((v) => v !== 0);
}

function explosion(beads) {
  let isExplose = false;
  let explosionScore = 0;
  let start = 0;

  while (start < beads.length) {
    let end = start + 1;
    while (end < beads.length && beads[start] === beads[end]) {
      end++;
    }

    const cnt = end - start;
    const num = beads[start];

    if (cnt >= 4) {
      isExplose = true;
      explosionScore += cnt * num;

      for (let k = start; k < end; k++) {
        beads[k] = 0;
      }
    }

    start = end;
  }

  return { beads, isExplose, explosionScore };
}

function reDefine(beads, limit) {
  let next = [];
  let start = 0;

  while (start < beads.length) {
    let end = start + 1;

    while (end < beads.length && beads[start] === beads[end]) end += 1;

    const num = beads[start];
    const cnt = end - start;

    next.push(cnt);
    if (next.length > limit) break;
    next.push(num);
    if (next.length > limit) break;

    start = end;
  }

  return next.slice(0, limit);
}

function solution(n, m, maps, blizards) {
  let answer = 0;

  // 상, 하, 좌, 우
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const { path, posToIdx } = makePath(n);
  let beads = path.map(([r, c]) => maps[r][c]);
  const center = Math.floor(n / 2);

  for (let i = 0; i < blizards.length; i++) {
    let x = center;
    let y = center;

    const [d, s] = blizards[i];
    // 1. 블리자드 ~ 구슬 파괴
    for (let atk = 0; atk < s; atk++) {
      x += dx[d - 1];
      y += dy[d - 1];

      if (x < 0 || x >= n || y < 0 || y >= n) break;
      const idx = posToIdx[x][y];
      if (idx != -1) {
        beads[idx] = 0;
      }
    }

    // 2. 압축
    beads = compress(beads);

    // 3. 폭발 후 압축 될 때까지
    while (true) {
      const result = explosion(beads);

      beads = result.beads;
      answer += result.explosionScore;

      if (!result.isExplose) break;
      beads = compress(beads);
    }

    // 4. 구슬 재정의
    beads = reDefine(beads, n * n - 1);
  }

  return answer;
}
