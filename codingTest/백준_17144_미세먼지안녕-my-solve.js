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

  const [r, c, t] = next().split(" ").map(Number);
  const map = [];

  while (idx < input.length) {
    map.push(next().split(" ").map(Number));
  }

  const result = solution(r, c, t, map);
  console.log(result);
  process.exit(0);
});

// ================= 확산 로직 =================
function spread(map, newMap, x, y) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  let cnt = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= map.length || ny < 0 || ny >= map[0].length) continue;
    if (map[nx][ny] === -1) continue;

    newMap[nx][ny] += Math.floor(map[x][y] / 5);
    cnt++;
  }

  newMap[x][y] += map[x][y] - Math.floor(map[x][y] / 5) * cnt;
}

// ================= 공청기 로직 =================
function clean(map, newMap, x1, y1, x2, y2, r, c) {
  // ---- 위쪽 공청기 ----
  let nx = x1;
  let ny = y1 + 1;
  newMap[x1][y1 + 1] = 0;

  // 오른쪽
  while (ny + 1 < c) {
    newMap[nx][ny + 1] = map[nx][ny];
    ny++;
  }

  // 위
  while (nx > 0) {
    newMap[nx - 1][ny] = map[nx][ny];
    nx--;
  }

  // 왼쪽
  while (ny > 0) {
    newMap[nx][ny - 1] = map[nx][ny];
    ny--;
  }

  // 아래
  while (nx + 1 < x1) {
    newMap[nx + 1][ny] = map[nx][ny];
    nx++;
  }

  // ---- 아래쪽 공청기 ----
  nx = x2;
  ny = y2 + 1;
  newMap[x2][y2 + 1] = 0;

  // 오른쪽
  while (ny + 1 < c) {
    newMap[nx][ny + 1] = map[nx][ny];
    ny++;
  }

  // 아래
  while (nx < r - 1) {
    newMap[nx + 1][ny] = map[nx][ny];
    nx++;
  }

  // 왼쪽
  while (ny > 0) {
    newMap[nx][ny - 1] = map[nx][ny];
    ny--;
  }

  // 위
  while (nx - 1 > x2) {
    newMap[nx - 1][ny] = map[nx][ny];
    nx--;
  }

  return newMap;
}

function solution(r, c, t, map) {
  let answer = 0;

  for (let i = 0; i < t; i++) {
    // 1. 확산
    let newMap = Array.from({ length: r }, () => Array(c).fill(0));

    for (let x = 0; x < r; x++) {
      for (let y = 0; y < c; y++) {
        if (map[x][y] > 0) {
          spread(map, newMap, x, y);
        } else if (map[x][y] === -1) {
          newMap[x][y] = -1;
        }
      }
    }

    // 2-1. 공청기 위치 찾기
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;

    outer: for (let x = 0; x < r; x++) {
      for (let y = 0; y < c; y++) {
        if (map[x][y] === -1) {
          x1 = x;
          y1 = y;
          x2 = x + 1;
          y2 = y;
          break outer;
        }
      }
    }

    // 2-2. 공청기 작동
    const spreadMap = newMap.map((row) => [...row]);
    newMap = clean(spreadMap, newMap, x1, y1, x2, y2, r, c);
    map = newMap;
  }

  // 3. 결과 합산
  for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
      if (map[x][y] > 0) {
        answer += map[x][y];
      }
    }
  }

  return answer;
}
