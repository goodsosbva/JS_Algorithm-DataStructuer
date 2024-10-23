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

class Deque {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  size() {
    return this.rear - this.front;
  }

  pop() {
    return this.items[this.front++];
  }
}

const dx = [0, 1, 0, -1, 0, 0];
const dy = [1, 0, -1, 0, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

function solution(input) {
  const [X, Y, H] = input[0].split(" ").map(Number);
  const maps = [];
  const queue = new Deque();
  let totalTomatoes = 0;
  let ripeTomatoes = 0;

  let index = 1;
  for (let z = 0; z < H; z++) {
    const layer = [];
    for (let y = 0; y < Y; y++) {
      const row = input[index++].split(" ").map(Number);
      layer.push(row);
    }
    maps.push(layer);
  }

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        if (maps[z][y][x] === 1) {
          queue.push([z, x, y, 0]);
          ripeTomatoes++;
        }
        if (maps[z][y][x] !== -1) {
          totalTomatoes++;
        }
      }
    }
  }

  if (ripeTomatoes === totalTomatoes) return 0;

  let answer = 0;
  while (queue.size() !== 0) {
    const [h, x, y, day] = queue.pop();
    answer = Math.max(answer, day);

    for (let i = 0; i < 6; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const nz = h + dz[i];

      if (
        0 <= nx &&
        nx < X &&
        0 <= ny &&
        ny < Y &&
        0 <= nz &&
        nz < H &&
        maps[nz][ny][nx] === 0
      ) {
        maps[nz][ny][nx] = 1;
        queue.push([nz, nx, ny, day + 1]);
        ripeTomatoes++;

        if (ripeTomatoes === totalTomatoes) return day + 1;
      }
    }
  }

  return ripeTomatoes === totalTomatoes ? answer : -1;
}
