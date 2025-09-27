function solution(n) {
    const answer = n.toString(2).split('').filter((zump) => zump === '1').length;
    
    return answer
}
