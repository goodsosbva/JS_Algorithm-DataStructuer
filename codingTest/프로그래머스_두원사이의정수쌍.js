function solution(r1, r2) {
    var answer = 0;
    
    for (let x = 1; x <= r2; x++) {
        const minX = Math.ceil(Math.sqrt(Math.max(0, r1 ** 2 - x ** 2)));
        const maxX = Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
        
        let y = maxX - minX + 1;
        answer += y;
    }
    
    answer = answer * 4;
    return answer;
}
