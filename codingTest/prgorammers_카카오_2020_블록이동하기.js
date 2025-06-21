function solution(board) {
    const N = board.length;
    const isEmpty = (x, y) =>
      x >= 0 && y >= 0 && x < N && y < N && board[x][y] === 0;
    
    const visited = Array.from({ length: N }, () => 
        Array.from({ length: N }, () => 
                Array.from({ length: N }, () => 
                    Array(N).fill(false)
            )
        )                           
    )
    
    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    
    const queue = [];
    queue.push([[0, 0], [0, 1], 0]);
    visited[0][0][0][1] = true;
    visited[0][1][0][0] = true;
    let step = 0;
    
    while (queue.length) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const [[x1, y1], [x2, y2], dir] = queue.shift();
            
            if ((x1 === N - 1 && y1 === N - 1) || (x2 === N - 1 && y2 === N - 1)) return step;
            
            for (const [dx, dy] of dirs) {
                const nx1 = x1 + dx, ny1 = y1 + dy;
                const nx2 = x2 + dx, ny2 = y2 + dy;
                
                if (isEmpty(nx1, ny1) && isEmpty(nx2, ny2) && !visited[nx1][ny1][nx2][ny2]) {
                    visited[nx1][ny1][nx2][ny2] = true;
                    visited[nx2][ny2][nx1][ny1] = true;
                    queue.push([[nx1, ny1], [nx2, ny2], dir]);
                }
            }
            
            if (x1 === x2) {
                for (const d of [-1, 1]) {
                    if (isEmpty(x1 + d, y1) && isEmpty(x2 + d, y2)) {
                        if (!visited[x1][y1][x1 + d][y1]) {
                            visited[x1][y1][x1 + d][y1] = true;
                            visited[x1 + d][y1][x1][y1] = true;
                            queue.push([[x1, y1], [x1 + d, y1], 1]);
                        }
                        if (!visited[x2][y2][x2 + d][y2]) {
                            visited[x2][y2][x2 + d][y2] = true;
                            visited[x2 + d][y2][x2][y2] = true;
                            queue.push([[x2, y2], [x2 + d, y2], 1]);
                        }
                    }
                }
            }
            
            if (y1 === y2) {
                for (const d of [-1, 1]) {
                    if (isEmpty(x1, y1 + d) && isEmpty(x2, y2 + d)) {
                        if (!visited[x1][y1][x1][y1 + d]) {
                            visited[x1][y1][x1][y1 + d] = true;
                            visited[x1][y1 + d][x1][y1] = true;
                            queue.push([[x1, y1], [x1, y1 + d], 0])
                        }
                        if (!visited[x2][y2 + d][x2][y2]) {
                            visited[x2][y2 + d][x2][y2] = true;
                            visited[x2][y2][x2][y2 + d] = true;
                            queue.push([[x2, y2], [x2, y2 + d], 0])
                        }
                    }
                }
            }
        }
        step += 1; 
    }

  return 0;
}
