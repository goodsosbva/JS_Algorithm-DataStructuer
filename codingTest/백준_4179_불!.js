const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const result = solution(input);
  console.log(result);
  process.exit(0);
});

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function bfs(fireQueue, n, m, fireTime) {
  while (fireQueue.length) {
    const [x, y, time] = fireQueue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (0 <= nx && nx < n && 0 <= ny && ny < m) {
        if (fireTime[nx][ny] === -1 && maps[nx][ny] !== -1) {
          fireTime[nx][ny] = time + 1;
          fireQueue.push([nx, ny, time + 1]);
        }
      }
    }
  }
}

function jihoon_bfs(x, y, n, m, fireTime) {
  let q = [];
  q.push([x, y, 1]);
  let visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[x][y] = true;

  if (x === 0 || y === 0 || x === n - 1 || y === m - 1) {
    return 1;
  }

  while (q.length) {
    const [x, y, time] = q.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (0 <= nx && nx < n && 0 <= ny && ny < m) {
        if (
          visited[nx][ny] === false &&
          maps[nx][ny] !== -1 &&
          (fireTime[nx][ny] === -1 || fireTime[nx][ny] > time + 1)
        ) {
          if (nx === 0 || ny === 0 || nx === n - 1 || ny === m - 1) {
            return time + 1;
          }
          visited[nx][ny] = true;
          q.push([nx, ny, time + 1]);
        }
      }
    }
  }

  return "IMPOSSIBLE";
}

function solution(input) {
  const [r, c] = input[0].split(" ").map(Number);
  maps = input.slice(1).map((line) =>
    line.split("").map((char) => {
      if (char === ".") return 0;
      if (char === "#") return -1;
      return char;
    })
  );

  let fireTime = Array.from({ length: r }, () => Array(c).fill(-1));
  let fireQueue = [];
  let jihoon_start = [-1, -1];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (maps[i][j] === "F") {
        fireQueue.push([i, j, 1]);
        fireTime[i][j] = 1;
      } else if (maps[i][j] === "J") {
        jihoon_start = [i, j];
        maps[i][j] = 0;
      }
    }
  }

  bfs(fireQueue, r, c, fireTime);

  const answer = jihoon_bfs(jihoon_start[0], jihoon_start[1], r, c, fireTime);

  return answer;
}
