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
  const [r, c, k] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < 3; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const answer = solution(r - 1, c - 1, k, maps);
  console.log(answer);
  process.exit(0);
});

function solution(r, c, k, maps) {
  let answer = 0;

  if (maps[r] && maps[r][c] !== undefined && maps[r][c] === k) return 0;

  while (true) {
    if (answer > 100) return -1;
    if (maps[r] && maps[r][c] !== undefined && maps[r][c] === k) return answer;

    const rowLen = maps.length;
    const colLen = maps[0].length;

    const newMaps = [];
    if (rowLen >= colLen) {
      for (let i = 0; i < rowLen; i++) {
        const dic = {};
        const stack = [];
        for (let j = 0; j < colLen; j++) {
          const v = maps[i][j];
          if (v === 0) continue;

          dic[v] = (dic[v] ?? 0) + 1;
        }

        for (const key of Object.keys(dic)) {
          const num = Number(key);
          stack.push([dic[key], num]);
        }

        stack.sort((a, b) => {
          if (a[0] !== b[0]) return a[0] - b[0];
          return a[1] - b[1];
        });

        const tmp = [];
        for (const stk of stack) {
          const [times, number] = stk;
          tmp.push(number);
          tmp.push(times);
        }

        newMaps.push(tmp);
      }
    } else {
      const t = Array.from({ length: colLen }, () => Array(rowLen).fill(0));
      for (let i = 0; i < colLen; i++) {
        for (let j = 0; j < rowLen; j++) {
          t[i][j] = maps[j][i];
        }
      }

      const newT = [];
      for (let i = 0; i < colLen; i++) {
        const dic = {};
        const stack = [];
        for (let j = 0; j < rowLen; j++) {
          const v = t[i][j];
          if (v === 0) continue;

          dic[v] = (dic[v] ?? 0) + 1;
        }

        for (const key of Object.keys(dic)) {
          const num = Number(key);

          stack.push([dic[key], num]);
        }

        stack.sort((a, b) => {
          if (a[0] !== b[0]) return a[0] - b[0];
          return a[1] - b[1];
        });

        const tmp = [];
        for (const stk of stack) {
          const [times, number] = stk;
          tmp.push(number);
          tmp.push(times);
        }

        newT.push(tmp);
      }

      let maxLen = 0;
      for (let i = 0; i < colLen; i++) {
        maxLen = Math.max(maxLen, newT[i].length);
      }

      newMaps.length = 0;
      for (let i = 0; i < maxLen; i++) {
        newMaps.push(Array(colLen).fill(0));
      }

      for (let i = 0; i < maxLen; i++) {
        for (let j = 0; j < colLen; j++) {
          newMaps[i][j] = newT[j][i] ?? 0;
        }
      }
    }

    let rNumber = -1;
    const cNumber = newMaps.length;
    for (let a = 0; a < newMaps.length; a++) {
      rNumber = Math.max(rNumber, newMaps[a].length);
    }

    const targetLen = Math.max(rNumber, cNumber);

    for (let a = 0; a < newMaps.length; a++) {
      const plus = targetLen - newMaps[a].length;
      if (plus > 0) newMaps[a].push(...Array(plus).fill(0));
    }

    maps = newMaps;
    answer += 1;
  }
}
