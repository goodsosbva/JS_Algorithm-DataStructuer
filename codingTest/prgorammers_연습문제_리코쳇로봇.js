function solution(board) {
    var answer = 0;
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    const r = board.length; 
    const c = board[0].length;
    
    const visited = Array.from({ length: r }, () => Array(c).fill(false));
    const grid = board.map(row => row.split("")); 
    
    let sr, sc, er, ec;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
          if (grid[i][j] === 'R') [sr, sc] = [i, j];
          if (grid[i][j] === 'G') [er, ec] = [i, j];
        }
    }
    
    const q = [[sr, sc, 0]];
    visited[sr][sc] = true;
    
    while(q.length) {
        let [x, y, d] = q.shift();
        
        if (x === er && y === ec) return d;
        
        for (let i = 0; i < 4; i++) {
            let nx = x;
            let ny = y;
            
            while (true) {
                const cx = nx + dx[i];
                const cy = ny + dy[i];
                
                if (cx < 0 || cy < 0 || cx >= r || cy >= c || board[cx][cy] === 'D') break;
                nx = cx;
                ny = cy;
            }
            
            if (!visited[nx][ny]) {
                q.push([nx, ny, d + 1]);
                visited[nx][ny] = true;
            }
        }
    }
    
    return -1;
}
