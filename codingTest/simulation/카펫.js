function solution(brown, yellow) {
    
    const total = brown + yellow;
    
    for (let span = 3; span <= Math.sqrt(total); span++) {
 
        if (total % span === 0) {
            const elevation = total / span;
            const isBrown = (span + elevation) * 2 - 4
            
            if (brown === isBrown) {
                return [Math.max(span, elevation), Math.min(span, elevation)];
            }
        }
    }
    
    return []
}