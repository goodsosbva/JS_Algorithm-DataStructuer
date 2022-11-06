function solution(a, b, n) {
    var answer = 0;
    
    var redundancy = 0;
    while (n >= a) {
        redundancy = n % a
        n = Math.floor(n / a) * b
        
        answer += (n)
        
        console.log(answer)
        n += redundancy
    }
        
    return Math.floor(answer);
}
