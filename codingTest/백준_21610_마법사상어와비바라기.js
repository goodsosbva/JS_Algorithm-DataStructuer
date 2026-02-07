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
  const [n, m] = input[0].split(" ").map(Number);

  const grid = input.slice(1, n + 1).map((line) => line.split(" ").map(Number));
  const moves = input.slice(n + 1).map((line) => line.split(" ").map(Number));

  const result = solution(n, m, grid, moves);
  console.log(result);
  process.exit(0);
});

function check(x, y, gird) {
  let cnt = 0;
  const dix = [-1, -1, 1, 1];
  const diy = [-1, 1, -1, 1];

  for (let i = 0; i < 4; i++) {
    const nx = x + dix[i];
    const ny = y + diy[i];
    if (nx < 0 || nx >= gird.length || ny < 0 || ny >= gird[0].length) continue;
    if (gird[nx][ny] > 0) cnt++;
  }

  return cnt;
}

function isPrevious(r, c, movedCloude) {
  const isPrev = movedCloude.some(
    (cloude) => cloude[0] === r && cloude[1] === c,
  );
  return isPrev;
}

function solution(n, m, grid, moves) {
  let answer = 0;
  const dx = [0, -1, -1, -1, 0, 1, 1, 1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  let cloude = [
    [n - 2, 0],
    [n - 2, 1],
    [n - 1, 0],
    [n - 1, 1],
  ];

  for (let i = 0; i < moves.length; i++) {
    let [d, time] = moves[i];
    d -= 1;

    // 1. 구름 이동 및 비내리기
    let movedCloude = [];
    for (let j = 0; j < cloude.length; j++) {
      const [x, y] = cloude[j];
      let nx = (x + dx[d] * time) % n;
      let ny = (y + dy[d] * time) % n;

      if (nx < 0) nx += n;
      if (ny < 0) ny += n;

      movedCloude.push([nx, ny]);
      grid[nx][ny] += 1;
    }

    // 2. 비복사
    for (let c = 0; c < movedCloude.length; c++) {
      const [x, y] = movedCloude[c];
      const cnt = check(x, y, grid);
      grid[x][y] += cnt;
    }

    // 3. 비구름 생성 - 이전 비구름은 제외
    cloude = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] >= 2 && !isPrevious(r, c, movedCloude)) {
          cloude.push([r, c]);
          grid[r][c] -= 2;
        }
      }
    }
  }

  // 4. 비 합계산
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      answer += grid[a][b];
    }
  }

  return answer;
}
