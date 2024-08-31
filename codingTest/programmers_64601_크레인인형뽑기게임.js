function solution(board, moves) {
  var answer = 0;
  const stacks = [...Array(board[0].length)].map(() => []);
  const basket = [];

  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j]) {
        stacks[j].push(board[i][j]);
      }
    }
  }

  for (let k = 0; k < moves.length; k++) {
    const stackIndex = moves[k] - 1;

    if (stacks[stackIndex].length > 0) {
      if (
        basket.length > 0 &&
        basket[basket.length - 1] ===
          stacks[stackIndex][stacks[stackIndex].length - 1]
      ) {
        stacks[stackIndex].pop();
        basket.pop();
        answer += 2;
      } else {
        basket.push(stacks[stackIndex].pop());
      }
    }
  }
  return answer;
}
