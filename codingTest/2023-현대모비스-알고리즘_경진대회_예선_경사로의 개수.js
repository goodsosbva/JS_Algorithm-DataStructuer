function solution(grid, d, k) {
    
    const MOD = 1_000_000_007;
    const MOD_BIG = 1000000007n;

    const R = grid.length;
    const C = grid[0].length;
    const N = R * C;

    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    
    const id = (r, c) => r * C + c;

    
    function mul(a, b) {
        return Number((BigInt(a) * BigInt(b)) % MOD_BIG);
    }
    
    function add(result, from, to, value) {
        if (value === 0) return;
        
        return result[from].set((result[from].get(to) ?? 0) + value)
    }
    
    function getStep(diff) {
        const step = Array.from({ length: N }, () => new Map());
        
        for (let n = 0; n < R; n++) {
            for (let m = 0; m < C; m++) {
                const from = id(n, m);
                
                for (const [nx, ny] of dirs) {
                    const cx = n + nx;
                    const cy = m + ny;
                    
                    if (cx < 0 || cx >= R || cy < 0 || cy >= C) continue;
                    
                    if (grid[cx][cy] - grid[n][m] === diff) {
                        const to = id(cx, cy);
                        step[from].set(to, 1);
                    }
                }
            }
        }
        
        return step;
    }
    
    const merge = (a, b) => {
        const res = Array.from({length: N}, () => (new Map()));
                               
        for (let from = 0; from < N; from++) {
            for (const [mid, cnta] of a[from]) {
                for (const [to, cntb] of b[mid]) {
                    const added = mul(cnta, cntb);
                    
                    const prev = res[from].get(to) ?? 0;
                    res[from].set(to, (prev + added) % MOD)
                }
            }
        }
        
        return res;
    }
    
    function moveDp(dp, cycle) {
        let next = Array(N).fill(0);
        
        for (let from = 0; from < N; from++) {
            if (dp[from] === 0) continue;
            
            for (const [to, cnt] of cycle[from]) {
                const added = mul(dp[from], cnt);
                next[to] = (next[to] + added) % MOD;
            }
        }
        
        return next;
    }
    
    let cycle = Array.from({ length: N }, (_, i) => new Map([[i, 1]]));
    
    for (const diff of d) {
        cycle = merge(cycle, getStep(diff));
    }
    
    let dp = Array(N).fill(1);
    
    while (k > 0) {
        if (k % 2 === 1) {
          dp = moveDp(dp, cycle);
        }

        k = Math.floor(k / 2);

        if (k > 0) {
          cycle = merge(cycle, cycle);
        }
    }

    
    return dp.reduce((sum, v) => (sum + v) % MOD, 0);
}
