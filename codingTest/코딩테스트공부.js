function solution(alp, cop, problems) {
    var answer = 0;
    let maxAlpReq = 0;
    let maxCopReq = 0;
    
    for (let i = 0; i < problems.length; i++) {
        maxAlpReq = Math.max(problems[i][0], maxAlpReq);
        maxCopReq = Math.max(problems[i][1], maxCopReq);
    }
    
    const dp = Array.from(Array(maxAlpReq + 1), () => Array(maxCopReq + 1).fill(151))
    
    alp = Math.min(alp, maxAlpReq);
    cop = Math.min(cop, maxCopReq);
    
    dp[alp][cop] = 0;
    
    for (let i = alp; i < maxAlpReq + 1; i++) {
        for (let j = cop; j < maxCopReq + 1; j++) {
            
            if (i < maxAlpReq) {
                dp[i + 1][j] = Math.min(dp[i][j] + 1, dp[i + 1][j]);
            }
            
            if (j < maxCopReq) {
                dp[i][j + 1] = Math.min(dp[i][j] + 1, dp[i][j + 1]);
            }
            
           for (let p = 0; p < problems.length; p++) {
                const prb = problems[p];
                if (i >= prb[0] && j >= prb[1]) {
                    const nextAlp = Math.min(i + prb[2], maxAlpReq);
                    const nextCop = Math.min(j + prb[3], maxCopReq);
                    
                    if (dp[nextAlp][nextCop] > dp[i][j] + prb[4]) {
                        dp[nextAlp][nextCop] = dp[i][j] + prb[4];
                    }
                }
            }
        }
    }
    
    return dp[maxAlpReq][maxCopReq];
}
