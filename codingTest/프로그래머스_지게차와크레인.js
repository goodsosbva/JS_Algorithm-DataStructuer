function update_outside(arr) {
    const q = [[0, 0]];
    const visited = Array.from({ length: arr.length }, () => Array(arr[0].length).fill(0));
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    
    while (q.length) {
        const [x, y] = q.pop(0);
        visited[x][y] = 1;
        
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            
            if (nx >= 0 && ny >= 0 && nx < arr.length && arr[0].length) {
                if (visited[nx][ny] === 0 && (arr[nx][ny] === -1) || arr[nx][ny] === 0) {
                    arr[nx][ny] = -1;
                    q.push([nx, ny]);
                    visited[nx][ny] = 1;
                }
            }
        }
    }
    
    return arr;
}

function wrapArray(arr) {
    const n = arr.length;
    const m = arr[0].length;

    const wrapped = Array.from(
        { length: n + 2 },
        () => Array(m + 2).fill(-1)
    );

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            wrapped[i + 1][j + 1] = arr[i][j];
        }
    }

    return wrapped;
}


function solution(storage, requests) {
    var answer = 0;
    
    let w_storage = wrapArray(storage);
    const n = w_storage.length;
    const m = w_storage[0].length;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    
    for (let i = 0; i < requests.length; i++) {
        const target = requests[i];
        
    
        if (target.length === 2) {
            // 크레인
             for (let q = 0; q < n; q++) {
                for (let w = 0; w < m; w++) {
                    let is_surface = false; 
                    if (w_storage[q][w] === target[0]) {
                        w_storage[q][w] = 0;
                    }
                }
            }
            
            for (let q = 0; q < n; q++) {
                for (let w = 0; w < m; w++) {
                    if (w_storage[q][w] === 0) {
                        for (let e = 0; e < 4; e++) {
                            const nx = q + dx[e];
                            const ny = w + dy[e];
                            
                            if (w_storage[nx][ny] === -1) {
                                w_storage[q][w] = -1;
                                break;
                            }
                        }
                    }
                }
            }
            
        } else {
            // 지게차
            for (let q = 0; q < n; q++) {
                for (let w = 0; w < m; w++) {
                    if (w_storage[q][w] === target) {
                        for (let e = 0; e < 4; e++) {
                            const nx = q + dx[e];
                            const ny = w + dy[e];
                            
                            if (w_storage[nx][ny] === -1) {
                                w_storage[q][w] = 1;
                                break;
                            }
                        }
                    }
                }
            }
            
            for (let q = 0; q < n; q++) {
                for (let w = 0; w < m; w++) {
                    if (w_storage[q][w] === 1) {
                       w_storage[q][w] = -1;
                    }
                }
            }
        }
        
        // -1 최신화
        w_storage = update_outside(w_storage);
    }
    
    for (let i = 0; i < w_storage.length; i++) {
        for (let j = 0; j < w_storage[0].length; j++) {
            if (w_storage[i][j] !== -1 && w_storage[i][j] !== 0) {
                answer += 1;
            }
        }
    }

    
    return answer;
}
