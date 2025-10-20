function solution(n) {
    const dp = [1, 2];

    for (let i = 2; i < n; i++) {
        const tmp = (dp[i - 1] + dp[i - 2]) % 1000000007;
        dp.push(tmp);
    }

    return dp[n - 1];
}

console.log(solution(4));