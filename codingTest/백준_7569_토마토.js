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

const dx = [1, -1, 0, 0, 0, 0];
const dy = [0, 0, 1, -1, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

function solution(input) {
  const [X, Y, H] = input[0].split(" ").map(Number);
  const maps = [];
  const queue = [];

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
          queue.push([z, y, x, 0]); 
        }
      }
    }
  }

  let answer = 0;
  while (queue.length > 0) {
    const [z, y, x, day] = queue.shift();
    answer = Math.max(answer, day);

    for (let i = 0; i < 6; i++) {
      const nz = z + dz[i];
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (
        nz >= 0 &&
        nz < H &&
        ny >= 0 &&
        ny < Y &&
        nx >= 0 &&
        nx < X &&
        maps[nz][ny][nx] === 0
      ) {
        maps[nz][ny][nx] = 1;
        queue.push([nz, ny, nx, day + 1]);
      }
    }
  }


  for (let z = 0; z < H; z++) {
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        if (maps[z][y][x] === 0) return -1; 
      }
    }
  }

  return answer;
}
