function solution(h1, m1, s1, h2, m2, s2) {
    var answer = 0;
    
    const st = h1 * 3600 + m1 * 60 + s1;
    const end = h2 * 3600 + m2 * 60 + s2;
    
    for (let k = 0;; k++) {
        const time = 360 * k / (6 - 0.1);
        
        if (end < time) break;
        
        if (st <= time && time <= end) answer += 1;
    }
    
    for (let l = 0;; l++) {
        const time = 360 * l / (6 - 1 / 120);
        
        if (end < time) break;
        
        if (st <= time && time <= end) answer += 1;
    }
    
    if (st <= 0 && 0 <= end) {
        answer -= 1;
    }
    if (st <= 12 * 3600 && 12 * 3600 <= end) {
        answer -= 1   
    }
    return answer;
}
