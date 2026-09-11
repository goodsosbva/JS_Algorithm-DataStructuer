function solution(arr, l, r) {
    var answer = [];
    const n = arr.length;
    
    let prefix_len = new Array(n + 1).fill(0);
    let prefix_sum = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefix_len[i + 1] = prefix_len[i] + arr[i];
        prefix_sum[i + 1] = prefix_sum[i] + arr[i] * arr[i];
    }
    
    const N = prefix_len[n];
    const L = l - 1;
    const R = r - 1;
    
    // 1. find block arr idx -> brr idx 구하기
    function find_block(pos) {
        let ldx = 0;
        let rdx = n - 1;
        
        while (ldx < rdx) {
            const mid = Math.floor((ldx + rdx) / 2);
            const block_end = prefix_len[mid + 1] - 1;
            
            if (block_end >= pos) {
                rdx = mid;
            } else {
                ldx = mid + 1;
            }
        }
        
        return ldx;
    }
    
    // 2. 구간내 합 구하기
    function range_sum(a, b) {
        const ab = find_block(a);
        const bb = find_block(b);
        
        if (ab === bb) {
            return (b - a + 1) * arr[ab];
        }
        
        const left_cnt = prefix_len[ab + 1] - a;
        const right_cnt = b - (prefix_len[bb] - 1);
        const mid_sum = prefix_sum[bb] - prefix_sum[ab + 1];
        
        return (left_cnt * arr[ab] + mid_sum + right_cnt * arr[bb]);
    }
    
    // 3. 해당 블록에 해당하는 arr 값
    function value_at(pos) {
        return arr[find_block(pos)];
    }
    
    const K = range_sum(L, R);
    const len = R - L + 1;
    const last_len = N - len;
    
    const break_points = new Set([0, last_len + 1]);
    
    for (let i = 0; i < n; i++) {
        const bs = prefix_len[i];
        
        if (bs <= last_len + 1) {
            break_points.add(bs);
        }
        
        const shift = bs - len;
        if (shift >= 0 && shift <= last_len + 1) {
            break_points.add(shift);
        }
    }
    
    const points = Array.from(break_points).sort((a, b) => a - b);
    
    let C = 0;
    for (let k = 0; k < points.length - 1; k++) {
        const seg_start = points[k];
        
        const seg_end = Math.min(points[k + 1] - 1, last_len);
        
        const cnt = seg_end - seg_start + 1;
        const seg_sum = range_sum(seg_start, seg_start + len - 1);
        
        let d = 0;
        if (seg_start + len <= N - 1) {
            d = value_at(seg_start + len) - value_at(seg_start);
        }
        
        if (d === 0) {
            if (seg_sum === K) {
                C += cnt;
            } 
        } else {
            const t = (K - seg_sum) / d;
            
            if (Number.isInteger(t) && t >= 0 && t < cnt) C += 1
        }
    }
    
    return [K, C];
}
