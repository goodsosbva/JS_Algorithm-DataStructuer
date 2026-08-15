function bfs(x, y, visited, land, number) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, 1, -1]
    
    const q = [[x, y]];
    let cnt = 0;
    
    while (q.length > 0) {
        const [x, y] = q.pop(0);
        
        visited[x][y] = 1;
        land[x][y] = number;
        cnt += 1;
        
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            
            if (nx >= 0 && ny >= 0 && nx < land.length && ny < land[0].length) {
                if (land[nx][ny] === 1 && visited[nx][ny] === -1) {
                    visited[nx][ny] = 1;
                    land[nx][ny] = number;
                    q.push([nx, ny]);
                } 
            }
        }
    }
    
    return [land, cnt];
}

function solution(land) {
    var answer = 0;
    const m = land[0].length;
    const n = land.length;
    const visited = Array.from({length: n}, () => Array(m).fill(-1));
    const dic = {};
    let number = 2;
    
    for (let i = 0; i < m; i++) {
        let ans = 0;
        
        for (let j = 0; j < n; j++) {    
            if (land[j][i] === 1 && visited[j][i] === -1) {
                const [ddang, cnt] = bfs(j, i, visited, land, number);
                land = ddang;

                dic[number] = (dic[number] ?? 0) + cnt;
                number++;
            } else continue;
            
        }
    }
    
    for (let i = 0; i < m; i++) {
        let ans = 0;
        let sets = new Set();
        for (let j = 0; j < n; j++) {
            if (land[j][i] !== 0) {
                sets.add(land[j][i])
            }
        }
        
        for (const set of sets) {
            ans += dic[set];
        }
        
        answer = Math.max(ans, answer);
    }
    
    return answer;
}
