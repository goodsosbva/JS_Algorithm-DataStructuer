function solution(m, n, h, w, drops) {
    let rains = [];
    let rainSquare = [];
    let latest = 0;
    
    let dropMap = Array.from(
      { length: m },
      () => Array(n).fill(drops.length + 1)
    );
    
    let idx = 1;
    for (const [x, y] of drops) {
        dropMap[x][y] = idx;
        idx += 1;
    }
    
    function slidingMin(arr, size) {
        const res = [];
        const q = [];
        let head = 0;
        
        for (let i = 0; i < arr.length; i++) {
            if (q[head] <= i - size) {
                head += 1;
            }
            
            while (head < q.length && arr[q[q.length - 1]] >= arr[i]) {
                q.pop()
            }
            
            q.push(i);
            
          
            if (i >= size - 1) {
                res.push(arr[q[head]])
            }
        }
        
        return res;
    }
    
    const rowMins = [];
    
    for (let i = 0; i < m; i++) {
        rowMins.push(slidingMin(dropMap[i], w))
    }
    
    for (let i = 0; i < n - w + 1; i++) {
        const cols = [];
        
        for (let j = 0; j < m; j++) {
            cols.push(rowMins[j][i])
        }
        
        rainSquare = slidingMin(cols, h);
        
        for (let k = 0; k < rainSquare.length; k++) {
            const cur = rainSquare[k];
            
            if (latest < cur) {
                latest = cur;
                rains = []
                rains.push([k, i]);
            } else if (latest === cur) {
                rains.push([k, i]);
            }
        }
    }
    
    rains.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    console.log(rains)
    return rains[0];
}
