function solution(n, w, num) {
    var answer = 0;
    
    const arr = [];
    const len = Math.ceil(n / w);
    let stn = 1;
    for (let i = 0; i < len; i++) {
        const tmp = [];
        for (let j = stn; j <= w * len; j++) {
            if (j > n) {
                tmp.push(-1);
            } else {
                tmp.push(j);    
            }
            
            if (j % w === 0) {
                stn = j + 1
                if (i % 2 === 1) {
                    arr.push(tmp.reverse());
                } else {
                    arr.push(tmp);   
                }
            
                break;
            }
        }
    }
    
    
    let stIdx = [-1, -1];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === num) {
                stIdx = [i, j]
            }
        }
    }
    
    const go = [1, 0];
    const h = [stIdx];
    while (h) {
        const [cx, cy] = h.pop();
        
        const nx = cx + go[0];
        const ny = cy + go[1];
        
        
        if (nx >= arr.length || ny >= arr[0].length) {
            break;
        }
        
        if (0 <= nx <= arr.length && 0 <= ny <= arr[0].length) {
            if (arr[nx][ny] !== -1) {
                answer += 1;
                h.push([nx, ny])
            } else {
                h.push([nx, ny])
            }
        } else {
            break;
        }
        
    }
 
    return answer + 1;
}
