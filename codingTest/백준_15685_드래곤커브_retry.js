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
  const n = Number(next());

  const curves = [];
  for (let i = 0; i < n; i++) {
    const numbers = next().split(" ").map(Number);
    curves.push(numbers);
  }

  const answer = solution(n, curves);
  console.log(answer);
  process.exit(0);
});

function solution(n, curves) {
  let answer = 0;
  const maps = Array.from(Array(101), () => Array(101).fill(0));

  // 0, 1, 2, 3
  const dirs = [
    [0, 1], // 0: r
    [-1, 0], // 1: u
    [0, -1], // 2: l
    [1, 0], // 3: d
  ];

  function getDirFromEnd([sx, sy], [ex, ey]) {
    const dx = sx - ex;
    const dy = sy - ey;

    if (dx === 0 && dy === 1) return 0;
    if (dx === -1 && dy === 0) return 1;
    if (dx === 0 && dy === -1) return 2;
    if (dx === 1 && dy === 0) return 3;
  }

  for (let curve of curves) {
    const [x, y, d, g] = curve;

    let going = [[y, x]];
    maps[y][x] = 1;
    const nx = y + dirs[d][0];
    const ny = x + dirs[d][1];
    going.push([nx, ny]);
    maps[nx][ny] = 1;
    for (let i = 0; i < g; i++) {
      const reverseDirs = [];
      for (let j = going.length - 1; j > 0; j--) {
        reverseDirs.push(getDirFromEnd(going[j], going[j - 1]));
      }

      const willGoing = [];
      for (let k = 0; k < reverseDirs.length; k++) {
        willGoing.push((reverseDirs[k] + 1) % 4);
      }

      let [ex, ey] = going.at(-1);
      let cx = ex;
      let cy = ey;
      for (let l = 0; l < willGoing.length; l++) {
        const [wx, wy] = dirs[willGoing[l]];

        cx += wx;
        cy += wy;

        maps[cx][cy] = 1;
        going.push([cx, cy]);
      }
    }
  }
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (
        maps[i][j] === 1 &&
        maps[i][j + 1] &&
        maps[i + 1][j] &&
        maps[i + 1][j + 1]
      )
        answer += 1;
    }
  }

  return answer;
}
