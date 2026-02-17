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
  const [n, q] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < 2 ** n; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const lcommands = next().split(" ").map(Number);

  const [totalIce, maxIce] = solution(n, q, maps, lcommands);
  console.log(totalIce, maxIce);
  process.exit(0);
});

function bfs(maps, isTouched, x, y) {
  const dr = [0, 1, 0, -1];
  const dc = [-1, 0, 1, 0];

  if (maps[x][y] <= 0) return [0, isTouched];
  const q = [[x, y]];
  let iceSize = 1;
  isTouched[x][y] = 1;

  while (q.length > 0) {
    const [cx, cy] = q.shift();
    isTouched[cx][cy] = 1;

    for (let i = 0; i < 4; i++) {
      const nx = cx + dr[i];
      const ny = cy + dc[i];

      if (0 <= nx && nx < maps.length && 0 <= ny && ny < maps.length) {
        if (isTouched[nx][ny] === -1 && maps[nx][ny] >= 1) {
          q.push([nx, ny]);
          iceSize += 1;
          isTouched[nx][ny] = 1;
        }
      }
    }
  }

  return [iceSize, isTouched];
}

function fourWaySerach(maps, r, c, size, sizeN) {
  const nr = [0, 1, 0, -1];
  const nc = [-1, 0, 1, 0];
  const melt = [];

  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      const searched = [];

      for (let p = 0; p < 4; p++) {
        const nx = i + nr[p];
        const ny = j + nc[p];

        if (nx >= 0 && nx < sizeN && ny >= 0 && ny < sizeN) {
          if (maps[nx][ny] > 0) searched.push([nx, ny]);
        }
      }

      if (searched.length < 3) {
        melt.push([i, j]);
      }
    }
  }

  return melt;
}

function solution(n, q, maps, lcommands) {
  let answer = 0;
  const sizeN = 2 ** n;
  let maxIce = 0;

  for (let i = 0; i < q; i++) {
    const l = lcommands[i];
    const size = 2 ** l;

    for (let a = 0; a < sizeN; a += size) {
      for (let b = 0; b < sizeN; b += size) {
        let r = a;
        let c = b;

        // 90도 회전
        const temp = Array.from({ length: size }, () => Array(size));

        for (let v = 0; v < size; v++) {
          for (let w = 0; w < size; w++) {
            temp[w][size - 1 - v] = maps[a + v][b + w];
          }
        }

        for (let v = 0; v < size; v++) {
          for (let w = 0; w < size; w++) {
            maps[a + v][b + w] = temp[v][w];
          }
        }
      }
    }

    const meltAll = [];
    for (let aa = 0; aa < sizeN; aa += size) {
      for (let bb = 0; bb < sizeN; bb += size) {
        let r = aa;
        let c = bb;

        const melt = fourWaySerach(maps, r, c, size, sizeN);
        meltAll.push(...melt);
      }
    }

    for (const [x, y] of meltAll) maps[x][y] = Math.max(0, maps[x][y] - 1);
  }

  for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < maps[0].length; j++) {
      answer += maps[i][j];
    }
  }

  let isTouched = Array.from(Array(maps.length), () =>
    Array(maps.length).fill(-1),
  );

  for (let i = 0; i < sizeN; i++) {
    for (let j = 0; j < sizeN; j++) {
      if (isTouched[i][j] === 1 || maps[i][j] <= 0) continue;
      const [isMaxIce, isTouched1] = bfs(maps, isTouched, i, j);
      maxIce = Math.max(maxIce, isMaxIce);
      isTouched = isTouched1;
    }
  }

  return [answer, maxIce];
}
