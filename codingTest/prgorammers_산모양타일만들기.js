function solution(n, tops) {
    var answer = 0;
    
    let ap = Array.from({length: n }, () => 0);
    let bp = Array.from({length: n }, () => 0);
    
    ap[0] = 1;
    if (tops[0] === 1) bp[0] = 3
    else bp[0] = 2;
    
    for (let i = 1; i < n; i++) {
        ap[i] = ap[i - 1] + bp[i - 1] % 10007
        
        if (tops[i] === 1) {
            bp[i] = (2 * ap[i - 1] + 3 * bp[i - 1]) % 10007;
        } else {
            bp[i] = (ap[i - 1] + 2 * bp[i - 1]) % 10007;
        }
    }
    
    return (ap[n - 1] + bp[n - 1]) % 10007;
}
