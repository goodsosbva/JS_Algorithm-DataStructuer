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
  const [n, m, k] = input[0].split(" ").map(Number);
  const commands = [];
  for (let i = 1; i <= m; i++) {
    const command = input[i].split(" ").map(Number);
    commands.push(command);
  }

  const result = solution(n, commands, k);
  console.log(result);
  process.exit(0);
});

function merged(fireBalls) {
  if (fireBalls.length === 0) return [];

  let newM = 0;
  let newS = 0;
  let newD = [];
  let cx = fireBalls[0][0];
  let cy = fireBalls[0][1];
  let isAllOdd = false;
  let sameDir = true;
  let directions = [];

  for (let i = 0; i < fireBalls.length; i++) {
    const [r, c, m, s, d] = fireBalls[i];
    newM += m;
    newS += s;
    directions.push(d);
  }

  // 질량 계산 및 속도 계산
  newM = Math.floor(newM / 5);
  newS = Math.floor(newS / fireBalls.length);

  if (newM < 1) return [];

  // 방향 정하기
  if (directions[0] % 2 === 0) isAllOdd = false;
  else isAllOdd = true;
  for (let j = 1; j < directions.length; j++) {
    if (directions[j] % 2 === 0 && isAllOdd === true) {
      sameDir = false;
      break;
    } else if (directions[j] % 2 === 1 && isAllOdd === false) {
      sameDir = false;
      break;
    }
  }

  if (sameDir) newD = [0, 2, 4, 6];
  else newD = [1, 3, 5, 7];

  let newFireBalls = [];
  for (let i = 0; i < 4; i++) {
    newFireBalls.push([cx, cy, newM, newS, newD[i]]);
  }

  return newFireBalls;
}

function solution(n, commands, k) {
  let answer = 0;
  const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dy = [0, 1, 1, 1, 0, -1, -1, -1];
  let maps = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => []),
  );

  // 1. 초기화
  for (let f = 0; f < commands.length; f++) {
    const [r, c, m, s, d] = commands[f];
    maps[r - 1][c - 1].push([r - 1, c - 1, m, s, d]);
  }

  // 2. k번 진행
  for (let q = 0; q < k; q++) {
    const newMaps = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => []),
    );
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // 3. 파이어볼이 있으면 진행 계산
        if (maps[i][j].length > 0) {
          for (const fireBall of maps[i][j]) {
            const direction = fireBall[4];
            const speed = fireBall[3];
            const cx = fireBall[0];
            const cy = fireBall[1];

            // 4. 이동
            const nx = (cx + dx[direction] * speed) % n;
            const ny = (cy + dy[direction] * speed) % n;
            const fx = (nx + n) % n;
            const fy = (ny + n) % n;

            const movedFireBall = [
              fx,
              fy,
              fireBall[2],
              fireBall[3],
              fireBall[4],
            ];
            newMaps[fx][fy].push(movedFireBall);
          }
        }
      }
    }

    // 5. fireball 합 계산
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        if (newMaps[a][b].length >= 2) {
          // fireball 합 계산
          const mergedFireBall = merged(newMaps[a][b]);
          newMaps[a][b] = mergedFireBall;
        }
      }
    }

    // 6. 맵 변환
    maps = newMaps;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (const fb of maps[i][j]) {
        answer += fb[2];
      }
    }
  }
  return answer;
}
