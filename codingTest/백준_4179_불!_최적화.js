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

class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
  }

  add(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }
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
  const fireQueue = new Queue();
  let jihoon_start = [-1, -1];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (maps[i][j] === "J") {
        jihoon_start = [i, j];
        maps[i][j] = 0;

        if (i === 0 || i === r - 1 || j === 0 || j === c - 1) {
          console.log(1);
          process.exit(0);
        }
      } else if (maps[i][j] === "F") {
        fireQueue.add([i, j, 1]);
        fireTime[i][j] = 1;
      }
    }
  }

  if (
    fireTime[jihoon_start[0]][jihoon_start[1]] !== -1 &&
    fireTime[jihoon_start[0]][jihoon_start[1]] <= 1
  ) {
    console.log("IMPOSSIBLE");
    return;
  }

  return bfs(r, c, fireQueue, jihoon_start, fireTime);
}

function bfs(r, c, fireQueue, jihoon_start, fireTime) {
  const q = new Queue();
  q.add([...jihoon_start, 1]);

  let visited = Array.from({ length: r }, () => Array(c).fill(false));
  visited[jihoon_start[0]][jihoon_start[1]] = true;

  while (!fireQueue.isEmpty()) {
    const [x, y, time] = fireQueue.dequeue();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        0 <= nx &&
        nx < r &&
        0 <= ny &&
        ny < c &&
        maps[nx][ny] !== -1 &&
        fireTime[nx][ny] === -1
      ) {
        fireQueue.add([nx, ny, time + 1]);
        fireTime[nx][ny] = time + 1;
      }
    }
  }

  while (!q.isEmpty()) {
    const [x, y, time] = q.dequeue();

    if (x === r - 1 || x === 0 || y === c - 1 || y === 0) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        0 <= nx &&
        nx < r &&
        0 <= ny &&
        ny < c &&
        !visited[nx][ny] &&
        maps[nx][ny] !== -1 &&
        (fireTime[nx][ny] == -1 || fireTime[nx][ny] > time + 1)
      ) {
        if (nx === r - 1 || nx === 0 || ny === c - 1 || ny === 0) {
          return time + 1;
        }
        q.add([nx, ny, time + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return "IMPOSSIBLE";
}
