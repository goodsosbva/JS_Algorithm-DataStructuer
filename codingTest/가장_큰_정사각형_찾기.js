function solution1(board)
{
    var answer = 1;
    var height = board.length;
    var width = board[0].length;

    for (let x = 0; x < height; x++) {
        for (let y = 0; y <width; y++) {
            console.log(x, y, board[x][y])
            if (board[x][y] === 1) {
                let i = 0;
                let j = 0;
                let ans = 0;
                // console.log(board[x][y + i], (board[x + i][y]));
                while (true) {
                    if (x < 0 || x + i >= height || y < 0 || y + i >= width) {
                        break;
                    }
                    // console.log(board[x][y + i], (board[x + i][y]), i);
                    if (board[x][y + i] === 1 && board[x + i][y] === 1) {
                        i++;
                        j++;
                        ans++;
                    }
                    else {
                        break;
                    }
                }
                answer = Math.max(answer, ans * ans);
            }
        }
    }

    return answer;
}


function solution(board) {
    let answer = 0;
    const height = board.length;
    const width = board[0].length;
  
    if (width === 1 && height === 1) return 1;
  
    for (let i = 1; i < height; i++) {
      for (let j = 1; j < width; j++) {
        if (board[i][j] > 0) {
          const up = board[i - 1][j];
          const left = board[i][j - 1];
          const cross = board[i - 1][j - 1];
          const minNum = Math.min(up, left, cross);
          board[i][j] = minNum + 1;
          answer = Math.max(answer, board[i][j]);
        }
      }
    }
  
    return answer * answer;
  }


console.log(solution([[0,0,1,1],[1,1,1,1]]))