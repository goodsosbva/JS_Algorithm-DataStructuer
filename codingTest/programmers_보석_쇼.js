function solution(gems) {
    const targetSize = new Set(gems).size;
    const map = new Map();
    
    let left = 0;
    let answer = [0, gems.length - 1];
    
    for (let right = 0; right < gems.length; right++) {
        map.set(gems[right], (map.get(gems[right]) || 0) + 1);
        
        while (map.size === targetSize) {
            if (right - left < answer[1] - answer[0]) {
                answer = [left, right];
            }
            
            const leftGem = gems[left];
            map.set(leftGem, map.get(leftGem) - 1);
            
            if (map.get(leftGem) === 0) {
                map.delete(leftGem);
            }
            
            left += 1;
        }
    }
    
    let ans_x = answer[0] + 1;
    let ans_y = answer[1] + 1;
    return [ans_x, ans_y];
}
