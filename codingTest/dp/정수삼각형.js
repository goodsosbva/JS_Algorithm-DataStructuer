function solution(triangle) {
    const h = triangle.length;
    const dp = Array.from({ length: h }, () => []);
    
    for (let i = 0; i < h; i++) {
        dp[i].push(...triangle[i]);
    }
    
    for (let i = h - 2; i >= 0; i--) {
        const w = triangle[i].length;
        for (let j = 0; j < w; j++) {
            dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
        }
    }
    
    return dp[0][0];
}
