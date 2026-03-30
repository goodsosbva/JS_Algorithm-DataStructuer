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
  const [n, l] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < n; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const answer = solution(n, l, maps);
  console.log(answer);
  process.exit(0);
});

function possibleRunway(arr, l) {
  const used = Array(arr.length).fill(false);

  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const cur = arr[i];

    if (prev === cur) continue;

    if (Math.abs(prev - cur) > 1) return false;

    // 오르막
    if (prev < cur) {
      for (let k = i - l; k < i; k++) {
        if (k < 0) return false;
        if (arr[k] !== prev) return false;
        if (used[k]) return false;
      }

      for (let k = i - l; k < i; k++) used[k] = true;
    }
    // 내리막
    else {
      for (let k = i; k < i + l; k++) {
        if (k > arr.length - 1) return false;
        if (arr[k] !== cur) return false;
        if (used[k]) return false;
      }

      for (let k = i; k < i + l; k++) used[k] = true;
    }
  }

  return true;
}

function solution(n, l, maps) {
  let answer = 0;

  for (let i = 0; i < maps.length; i++) {
    const isPossible = possibleRunway(maps[i], l);

    if (isPossible) answer++;
  }

  for (let i = 0; i < maps[0].length; i++) {
    let arr = [];
    for (let j = 0; j < maps.length; j++) {
      arr.push(maps[j][i]);
    }

    const isPossible = possibleRunway(arr, l);

    if (isPossible) answer++;
  }

  return answer;
}
