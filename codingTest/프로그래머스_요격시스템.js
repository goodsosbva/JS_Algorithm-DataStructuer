function solution(targets) {
    var answer = 1;
    
    targets.sort((a, b) => {
        return a[1] - b[1];
    });
    
    
    let cur = 0;
    for (let i = 0; i < targets.length; i++) {
        if (i < cur) continue;
        
        const arr = [...targets[i]];
        
        const st = arr[0];
        const end = arr[arr.length - 1];
        
        
        for (let j = i + 1; j < targets.length; j++) {
            if (j < cur) continue;
            
            const arr2 = [...targets[j]];
            
            const st2 = arr2[0];
            const end2 = arr2[arr2.length - 1];
            
            
            if (end > st2) {
                cur += 1;
            } else {
                answer += 1;
                cur = j;
                break;
            }
            
        }
    }
    
    return answer;
}
