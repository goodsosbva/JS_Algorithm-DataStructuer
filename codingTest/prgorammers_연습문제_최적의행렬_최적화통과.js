function solution(matrix_sizes) {
    const n = matrix_sizes.length;
    const p = new Array(n + 1);
    
    for (let i = 0; i < n; i++) {
        p[i] = matrix_sizes[i][0];
    } 
    p[n] = matrix_sizes[n - 1][1];
    
    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i][j] = Infinity;
        }
        dp[i][i] = 0;
    }
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; len + i - 1 < n; i++) {
            const j = len + i - 1;
            
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
                
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                }
            }
        }
    }
    
    return dp[0][n - 1]
}
