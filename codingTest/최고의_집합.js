function solution(n, s) {
    if (n > s) return [-1];
    const mid = Math.floor(s / n);
    const answer = new Array(n).fill(mid);
    
    console.log(answer, s % n);
    for (let i = 0; i < s % n; i++) {
        answer[answer.length - 1 - i]++;
    }
    
    return answer;
}

console.log(solution(3, 10));