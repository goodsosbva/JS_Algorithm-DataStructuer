function solution(strs, t) {
    var answer = 0;
    const n = t.length;
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    const strsSet = new Set(strs);
    const sizes = new Set(strs.map((str) => str.length));
    
    for (let i = 0; i <= n; i++) {
        for (const size of sizes) {
            if (i - size >= 0) {
                const sub = t.slice(i - size, i);
                if (strsSet.has(sub)) {
                    dp[i] = Math.min(dp[i], dp[i - size] + 1)
                }
            }
        }
    }
    
    answer = dp[n] === Infinity ? -1 : dp[n]
    return answer;
}
