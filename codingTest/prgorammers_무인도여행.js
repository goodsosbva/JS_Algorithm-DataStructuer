const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(maps, visited, x, y) {
    q = [];
    q.push([x, y])
    visited[x][y] = 1;
    const row = maps.length;
    const col = maps[0].length;
    let ans = Number(maps[x][y]);
    
    while (q.length > 0) {
        const [a, b] = q.pop();
        
        for (let i = 0; i < 4; i++) {
            const nx = a + dx[i];
            const ny = b + dy[i];
            
            if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;
            
            if (maps[nx][ny] !== 'X' && visited[nx][ny] === -1) {
                ans += Number(maps[nx][ny]);
                visited[nx][ny] = 1;
                q.push([nx, ny]);
            }
        }
    }
    
    return ans;
}

function solution(maps) {
    var answer = [];
    
    const row = maps.length;
    const col = maps[0].length;
    const visited = Array.from(
      { length: row },
      () => Array.from({ length: col }, () => -1)
    );
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (maps[i][j] !== 'X' && visited[i][j] === -1) {
                const ans = bfs(maps, visited, i, j)
                answer.push(ans);
            }
        }
    }
    
    answer.sort((a, b) => {
        return a - b;
    })
    if (answer.length === 0) return [-1];
    return answer;
}
