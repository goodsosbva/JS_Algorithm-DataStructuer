function permutation(arr, n) {
    if (n === 0) return [[]];
    const result = [];
    
    arr.forEach((fixed, idx) => {
        const rest = [...arr];
        rest.splice(idx, 1);
        
        const perms = permutation(rest, n - 1);
        
        const combine = perms.map((p) => [fixed, ...p]);
        
        result.push(...combine);
    })
    
    return result;
}


function solution(n, weak, dist) {
    var answer = dist.length + 1;
    
    const length = weak.length;
    for  (let i = 0; i < length; i++) {
        weak.push(weak[i] + n);
    }
    

    for (let i = 0; i < length; i++) {
        for (const friends of permutation(dist, dist.length)) {
            let cnt = 1;
            let position = weak[i] + friends[cnt - 1];
            
            for (let j = i; j < i + length; j++) {
                if (position < weak[j]) {
                    cnt += 1;
                    
                    if (cnt > dist.length) {
                        break;
                    }
                    
                    position = weak[j] + friends[cnt - 1];
                }
            }
            
            answer = Math.min(answer, cnt)
            
        }
    }
    return answer <= dist.length ? answer : -1;
}
