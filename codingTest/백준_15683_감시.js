const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [m, n] = input[0].split(" ").map(Number);
  const matrix = input.slice(1, m + 1).map((line) => line.split(" ").map(Number));

  const cctvs = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] >= 1 && matrix[i][j] <= 5) {
        cctvs.push({ type: matrix[i][j], x: i, y: j });
      }
    }
  }

  const directions = {
    1: [[0], [1], [2], [3]],
    2: [
      [0, 2],
      [1, 3],
    ],
    3: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ],
    4: [
      [0, 1, 3],
      [0, 1, 2],
      [1, 2, 3],
      [0, 2, 3],
    ],
    5: [[0, 1, 2, 3]],
  };

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  let answer = Infinity;
  recursive(0, matrix);

  console.log(answer);

  function possibleCheckSpot(matrix) {
    let count = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 0) count++;
      }
    }
    return count;
  }

  function recursive(k, matrix) {
    if (k === cctvs.length) {
      const candi = possibleCheckSpot(matrix);
      answer = Math.min(answer, candi);
      return answer;
    }

    const { type, x, y } = cctvs[k];
    for (direct of directions[type]) {
      const newMatrix = markShap(matrix, x, y, direct);
      recursive(k + 1, newMatrix);
    }
  }

  function markShap(matrix, x, y, direct) {
    const newMatrix = matrix.map((row) => [...row]);

    for (const dir of direct) {
      let nx = x;
      let ny = y;

      while (true) {
        nx += dx[dir];
        ny += dy[dir];

        if (nx < 0 || ny < 0 || nx >= m || ny >= n) break;
        if (matrix[nx][ny] === 6) break;
        if (matrix[nx][ny] === 0) {
          newMatrix[nx][ny] = "#";
        }
      }
    }

    return newMatrix;
  }
});
