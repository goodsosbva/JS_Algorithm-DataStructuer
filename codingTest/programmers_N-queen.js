function solution(n) {
  const row = Array.from({ length: n }, () => -1);
  const leftDiagonal = Array.from({ length: 2 * (n - 1) + 1 }, () => -1);
  const rightDiagonal = Array.from({ length: 2 * (n - 1) + 1 }, () => -1);
  const answer = { count: 0 };

  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(new Array(n).fill(0));
  }

  recursive(0, row, leftDiagonal, rightDiagonal, n, arr, answer);
  return answer.count;
}

function recursive(k, row, leftDiagonal, rightDiagonal, n, arr, answer) {
  if (k === n) {
    answer.count += 1;
    return;
  }

  for (let j = 0; j < n; j++) {
    const isRow = j;
    const isLeft = k + j;
    const isRight = k - j + (n - 1);

    if (
      row[isRow] === -1 &&
      leftDiagonal[isLeft] === -1 &&
      rightDiagonal[isRight] === -1
    ) {
      row[isRow] = k;
      leftDiagonal[isLeft] = k;
      rightDiagonal[isRight] = k;
      recursive(k + 1, row, leftDiagonal, rightDiagonal, n, arr, answer);
      row[isRow] = -1;
      leftDiagonal[isLeft] = -1;
      rightDiagonal[isRight] = -1;
    }
  }
}
