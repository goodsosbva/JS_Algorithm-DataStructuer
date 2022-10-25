function solution1(n) {
  let answer = 0;

  const dfs = (board, row) => {
    if (row === n) answer++;
    else {
      for (let i = 1; i <= n; i++) {
        board[row + 1] = i;
        // console.log(board);
        if (isValid(board, row + 1)) dfs(board, row + 1);
      }
    }
  };

  const isValid = (board, row) => {
    for (let i = 1; i < row; i++) {
      if (board[i] === board[row]) return false;
      if (Math.abs(board[i] - board[row]) === Math.abs(i - row)) return false;
    }
    return true;
  };

  for (let i = 1; i <= n; i++) {
    const board = new Array(n + 1).fill(0);
    board[1] = i;
    dfs(board, 1);
  }

  return answer;
}

function solution(n) {
  let answer = 0;
  const NOT_VISITED = 100;
  const status = Array(n).fill(NOT_VISITED);

  const isAvailable = (status, row, col) => {
    if (status[col] !== NOT_VISITED) return false;
    for (let idx = 0; idx < status.length; idx++) {
      if (Math.abs((row - status[idx]) / (col - idx)) === 1) {
        return false;
      }
    }
    return true;
  };

  const dfs = (n, row, status) => {
    if (row === n) {
      answer += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isAvailable(status, row, col)) {
        status[col] = row;
        dfs(n, row + 1, status);
        status[col] = NOT_VISITED;
      }
    }
  };

  dfs(n, 0, status);

  return answer;
}

console.log(solution(4));
