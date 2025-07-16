function solution(board, apos, bpos) {
    const row = board.length;
    const col = board[0].length;
    
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
    
    function isValid(r, c) {
        return 0 <= r && r < row && 0 <= c && c < col; 
    }
    
    function recursiveSearh(apos, bpos, visited, step) {
        const [r, c] = step % 2 === 0 ? apos : bpos;
        let canMove = false;
        let isOppnentWin = true;
        
        const winSteps = [];
        const loseSteps = [];
        
        
        for (let i = 0; i < 4; i++) {
            const cr = r + dr[i];
            const cc = c + dc[i];
            
            if (isValid(cr, cc) && board[cr][cc] && !visited.has(`${cr}${cc}`)) {
                canMove = true;
                
                if (apos[0] === bpos[0] && apos[1] === bpos[1]) {
                    return [true, step + 1];
                }
                
                const [win, stepLeft] = step % 2 === 0 
                    ? recursiveSearh([cr, cc], bpos, new Set([...visited, `${r}${c}`]), step + 1)
                    : recursiveSearh(apos, [cr, cc], new Set([...visited, `${r}${c}`]), step + 1)
                
                isOppnentWin &= win;
                
                if (win) {
                    winSteps.push(stepLeft)
                } else {
                    loseSteps.push(stepLeft)
                }
            }
        }
        
        if (!canMove) { 
            return [false, step]
        }
        
        if (isOppnentWin) {
            return [false, Math.max(...winSteps)]
        }
        
        return [true, Math.min(...loseSteps)]
        
    }
    
    const [win, steps] = recursiveSearh(apos, bpos, new Set(), 0);
    
    return steps;
}
