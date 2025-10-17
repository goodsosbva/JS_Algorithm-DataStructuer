function solution(n) {
    const dp = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        const tmp = dp[i - 1] + dp[i - 2];
        dp.push(tmp % 1234567);
    }
    
    return dp[n];
}
