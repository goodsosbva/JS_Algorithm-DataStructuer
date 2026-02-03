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

// 확산 로직 (그대로 유지)
function spread(map, newMap, x, y) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let cnt = 0;
  const diffusionAmount = Math.floor(map[x][y] / 5);

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= map.length || ny < 0 || ny >= map[0].length) continue;
    if (map[nx][ny] === -1) continue;
    newMap[nx][ny] += diffusionAmount;
    cnt++;
  }
  newMap[x][y] += map[x][y] - diffusionAmount * cnt;
}

// 공청기 로직 (수정본)
function clean(map, newMap, x1, y1, x2, y2, r, c) {
  // 문제점 수정 1: 순환 경로 외의 먼지 데이터 보존을 위해 전체 복사
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] !== -1) newMap[i][j] = map[i][j];
    }
  }

  // --- 위쪽 공청기 (반시계) ---
  let nx = x1;
  let ny = y1 + 1;
  newMap[nx][ny] = 0; // 공청기에서 나오는 깨끗한 공기

  // 오른쪽 이동
  while (ny + 1 < c) {
    newMap[nx][ny + 1] = map[nx][ny];
    ny++;
  }
  // 위로 이동
  while (nx > 0) {
    newMap[nx - 1][ny] = map[nx][ny];
    nx--;
  }
  // 왼쪽으로 이동
  while (ny > 0) {
    newMap[nx][ny - 1] = map[nx][ny];
    ny--;
  }
  // 아래로 이동 (공청기로 들어감)
  while (nx < x1 - 1) { // x1까지 내려가되 공청기(-1)를 덮어쓰지 않게 주의
    newMap[nx + 1][ny] = map[nx][ny];
    nx++;
  }

  // --- 아래쪽 공청기 (시계) ---
  nx = x2;
  ny = y2 + 1;
  newMap[nx][ny] = 0; // 깨끗한 공기

  // 오른쪽 이동
  while (ny + 1 < c) {
    newMap[nx][ny + 1] = map[nx][ny];
    ny++;
  }
  // 아래로 이동
  while (nx < r - 1) {
    newMap[nx + 1][ny] = map[nx][ny];
    nx++;
  }
  // 왼쪽으로 이동
  while (ny > 0) {
    newMap[nx][ny - 1] = map[nx][ny];
    ny--;
  }
  // 위로 이동 (공청기로 들어감)
  while (nx > x2 + 1) {
    newMap[nx - 1][ny] = map[nx][ny];
    nx--;
  }

  return newMap;
}

function solution(r, c, t, map) {
  // 공청기 위치 미리 찾기 (매 루프마다 찾을 필요 없음)
  let x1 = -1;
  for (let i = 0; i < r; i++) {
    if (map[i][0] === -1) {
      x1 = i;
      break;
    }
  }
  let x2 = x1 + 1;

  for (let i = 0; i < t; i++) {
    let diffusedMap = Array.from({ length: r }, () => Array(c).fill(0));
    // 공청기 위치 초기화
    diffusedMap[x1][0] = -1;
    diffusedMap[x2][0] = -1;

    // 1. 확산
    for (let x = 0; x < r; x++) {
      for (let y = 0; y < c; y++) {
        if (map[x][y] > 0) spread(map, diffusedMap, x, y);
      }
    }

    // 2. 공기청정기 작동 (확산된 결과를 clean에 넘김)
    let cleanedMap = Array.from({ length: r }, () => Array(c).fill(0));
    cleanedMap[x1][0] = -1;
    cleanedMap[x2][0] = -1;
    
    map = clean(diffusedMap, cleanedMap, x1, 0, x2, 0, r, c);
  }

  // 결과 계산
  return map.reduce((acc, row) => acc + row.reduce((sum, v) => v > 0 ? sum + v : sum, 0), 0);
}
