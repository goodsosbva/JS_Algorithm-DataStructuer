function level_test(diffs, times, level, limit) {
    let time_cur = 0;
    let zero = 0;
    
    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] <= level) {
            time_cur += times[i];
        } else {
            let prev_test = 0
            if (i > 0) prev_test = times[i - 1];
            
            const plus = (diffs[i] - level) * (times[i] + prev_test);
            time_cur += plus;
            time_cur += times[i];
        }
        
        
    }
    
    if (time_cur > limit) return false;
    else return true;
}

function solution(diffs, times, limit) {
    var answer = 0;
    let left = 1;
    let right = 0;

    for (const diff of diffs) {
        right = Math.max(right, diff);
    }
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        const is_possible = level_test(diffs, times, mid, limit);
        
        if (is_possible) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1; 
        }
    }
    
    return answer;
}
