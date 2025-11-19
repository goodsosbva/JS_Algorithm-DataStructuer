function solution(n, m, x, y, r, c, k) {
    let answer = "";
    const dx = [1, 0, 0, -1];
    const dy = [0, -1, 1, 0];
    const ds = ['d', 'l', 'r', 'u'];

    let cx = x - 1;
    let cy = y - 1;
    let er = r - 1;
    let ec = c - 1;
    
    const dist = (a, b, c, d) => Math.abs(a - c) + Math.abs(b - d);
    
    if (dist(cx, cy, er, ec) > k) return 'impossible';
    if ((k - dist(cx, cy, er, ec)) % 2 !== 0) return 'impossible';
    
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < 4; j++) {
            const nx = cx + dx[j];
            const ny = cy + dy[j];
            
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            
            const remain = k - i - 1;
            const d = dist(nx, ny, er, ec);
            
            if (d <= remain && (remain - d) % 2 === 0) {
                answer += ds[j];
                cx = nx;
                cy = ny;
                break;
            }
        }
    }
    
    return answer;
}
