function bfs(maps, start, end) {
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    
    const visited = Array.from({ length: maps.length }, () => Array(maps[0].length).fill(false));
    const q = [[start[0], start[1], 0]];
    visited[start[0]][start[1]] = true;
    
    while (q.length > 0) {
        const [x, y, dis] = q.shift()
        
        if (x === end[0] && y === end[1] && dis <= 2) return false;
        if (dis >= 2) continue;
        
        for (let i = 0; i < 4; i++) { 
            const nx = x + dx[i];
            const ny = y + dy[i];
            
            if (nx < 0 || ny < 0 || nx >= maps.length || ny >= maps[0].length) continue;
            if (visited[nx][ny]) continue;
            if (maps[nx][ny] === 'X') continue;
            
            visited[nx][ny] = true;
            q.push([nx, ny, dis + 1]);
        }
    }
    
    return true;
}

function checkTheSpot(maps) {
    const spots = [];
    for (let i = 0; i < maps.length; i++) {
        for (let j = 0; j < maps[0].length; j++) {
            if (maps[i][j] === 'P') {
                spots.push([i, j])
            }
        }
    }
    
    return spots;
}

function solution(places) {
    var answer = [];
    
    for (let i = 0; i < places.length; i++) {
        
        for (let e = i + 1; e < places.length; e++) {
            
        }
        const spots = checkTheSpot(places[i]);
        
        if (spots.length === 0) {
            answer.push(1);
            continue;
        }
        
        let isAnswer = true;
        for (let k = 0; k < spots.length; k++) {
            for (let l = k + 1; l < spots.length; l++) {
                const isDistance = bfs(places[i], spots[k], spots[l]);
                if (!isDistance) {
                    isAnswer = false;
                    break;
                } 
            }
           
        }
        
        if (!isAnswer) {
            answer.push(0);
        } else {
            answer.push(1);
        }
    }
    return answer;
}
