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
  const [n, m, k] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < n; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const trees = [];
  for (let j = 0; j < m; j++) {
    const [x, y, z] = next().split(" ").map(Number);
    trees.push([x - 1, y - 1, z]);
  }

  const answer = solution(n, k, maps, trees);
  console.log(answer);
  process.exit(0);
});

function solution(n, k, maps, trees) {
  let answer = 0;

  let liveTree = {};
  for (let i = 0; i < trees.length; i++) {
    const [x, y, z] = trees[i];
    const key = `${x},${y}`;

    if (!liveTree[key]) {
      liveTree[key] = [];
    }
    liveTree[key].push([x, y, z]);
  }

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const nutrient = Array.from({ length: n }, () => Array(n).fill(5));
  for (let c = 0; c < k; c++) {
    // 봄
    const deadTree = [];
    const allSurvied = [];

    for (let i = 0; i < maps.length; i++) {
      for (let j = 0; j < maps[0].length; j++) {
        const key = `${i},${j}`;
        if (Object.hasOwn(liveTree, key)) {
          const arr = liveTree[key].sort((a, b) => a[2] - b[2]);
          const survived = [];

          for (const tree of arr) {
            const age = tree[2];

            if (nutrient[i][j] >= age) {
              tree[2] += 1;
              nutrient[i][j] -= age;
              survived.push(tree);
              allSurvied.push(tree);
            } else {
              deadTree.push(tree);
            }
          }

          liveTree[key] = survived;
        }
      }
    }

    // 여름
    for (let deadT of deadTree) {
      const [x, y, age] = deadT;
      nutrient[x][y] += Math.floor(age / 2);
    }

    // 가을
    for (let i = 0; i < allSurvied.length; i++) {
      const [x, y, z] = allSurvied[i];

      if (z % 5 === 0) {
        for (let j = 0; j < 8; j++) {
          const [dx, dy] = dirs[j];

          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < maps.length && ny >= 0 && ny < maps[0].length) {
            const key = `${nx},${ny}`;
            if (!liveTree[key]) {
              liveTree[key] = [];
            }
            liveTree[key].push([nx, ny, 1]);
          }
        }
      }
    }

    // 겨울
    for (let i = 0; i < maps.length; i++) {
      for (let j = 0; j < maps[i].length; j++) {
        nutrient[i][j] += maps[i][j];
      }
    }
  }

  for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < maps[i].length; j++) {
      const key = `${i},${j}`;
      if (Object.hasOwn(liveTree, key)) {
        answer += liveTree[key].length;
      }
    }
  }

  return answer;
}
