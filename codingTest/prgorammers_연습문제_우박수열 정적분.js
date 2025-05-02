function makeHailfunction(n) {
    hails = [n];
    while(true) {
        if (n === 1) break;
        
        if (n % 2 === 0) {
            n = n / 2;
            hails.push(n);
        } else if (n % 2 === 1) {
            n = n * 3 + 1;
            hails.push(n);
        }
    }
    
    return hails;
}

function solution(k, ranges) {
    var answer = [];
    
    const hails = makeHailfunction(k);
    const n = hails.length - 1;
    const definiteIntegrals = [];
    
    for (let i = 0; i < hails.length - 1; i++) {
        const ny = hails[i + 1];
        const cy = hails[i];
        
        const rHeight = ny > cy ? cy : ny;
        const triangle = Math.abs(ny - cy) / 2;
        const rectangle = rHeight;
        
        const definiteIntegral = triangle + rectangle;
        definiteIntegrals.push(definiteIntegral);
    }
    
    const prefixSum = [definiteIntegrals[0]];
    
    for (let i = 1; i < definiteIntegrals.length; i++) {
        const pSum = prefixSum[i - 1] + definiteIntegrals[i];
        
        prefixSum.push(pSum);
    }
    
    prefixSum.unshift(0)
    
    for (let i = 0; i < ranges.length; i++) {
        let [x, y] = ranges[i];
        
        if (x === 0 && y === 0) {
            answer.push(prefixSum[prefixSum.length - 1])
         } else if (y < 0) {
            if (n + y < x) {
                answer.push(-1);
                continue;
            }
            const area = prefixSum[n + y] - prefixSum[x];
            answer.push(area);
        } else {
            if (x > n) {
                answer.push(-1);
                continue;
            }
            const area = prefixSum[n] - prefixSum[x];
            answer.push(area);
        }
    }
    return answer;
}
