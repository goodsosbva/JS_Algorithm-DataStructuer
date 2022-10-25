function solution(n) {
    var answer = 0;
    const dp = Array.from({length: n + 1}, () => 0);
    dp[2] = 3;
    dp[3] = 0;
    dp[4] = 11;
    
    for (let i = 5; i < n + 1; i++) {
        if (i % 2 === 1) {
            dp[i] = 0
        }
        else if (i % 2 === 0) {
            dp[i] += dp[i - 2] * 3
            for (let j = 2; j < i - 2; j += 2) {
                dp[i] += dp[j] * 2
            }
            dp[i] += 2
            dp[i] = dp[i] % 1000000007
        }
    }
    
    // console.log(dp);
    return dp[n] % 1000000007;
}
