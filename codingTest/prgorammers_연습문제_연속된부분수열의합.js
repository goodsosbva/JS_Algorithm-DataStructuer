function solution(sequence, k) {
    var answer = [];
    
    const n = sequence.length;
    let left  = 0
    let right = 0;
    let sum = sequence[0];  
    let bestLen = Infinity;
    
    while (left < n && right < n) {
        if (sum === k) {
            const len = right - left;
            
            if (bestLen > len) {
                bestLen = len;
                answer = [left, right]
            }
            
            sum -= sequence[left++];
            
        } else if (k > sum) {
            right += 1
             if (right < n) sum += sequence[right];
        } else if (k < sum) {
            sum -= sequence[left++];
        }
    }
    return answer;
}
