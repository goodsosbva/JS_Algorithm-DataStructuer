function chk_dot_number(boards) {
    let cnt = 0;
    
    for (const board of boards) {
        for (const dot of board) {
            if (dot !== '.') cnt += 1;
        }
    } 
    
    return cnt;
}

function count_oh(boards, oh) {
    let cnt = 0;
    
    for (const board of boards) {
        for (const dot of board) {
            if (dot === oh) cnt += 1;
            
        }
    }
    
    return cnt;
}

function chk_3line(boards) {
    let x_len = boards.length;
    let y_len = boards[0].length;
    let result = {'O': 0, 'X': 0};
    
    for (let x = 0; x < x_len; x++) {
        for (let y = 0; y < y_len; y++) {
            if (x >= 1 && y >= 1) continue;
            if (boards[x][y] === '.') continue;
            let cnt = 0;
            let oh = boards[x][y];
            
            // [0, 0], [2, 0] 대각선까지 체크
            if (x === 0 && y === 0) {
                let is_same_right = true;
                let is_same_bottom = true;
                let is_same_diagonal = true;
                
                for (let i = 1; i < 3; i++) {
                    if (oh !== boards[x][i]) {
                            is_same_right = false;
                            break;
                    };
                }
                    
                if (is_same_right) {
                    result[oh] += 1;
                }
                
                for (let i = 1; i < 3; i++) {
                    if (oh !== boards[i][y]) {
                        is_same_bottom = false;
                        break;
                    };
                }
                    
                if (is_same_bottom) {
                    result[oh] += 1;
                }
                
                for (let i = 0; i < 3; i++) {
                    if (oh !== boards[i][i]) {
                        is_same_diagonal = false;
                        break;
                    }
                }
                
                if (is_same_diagonal) {
                    result[oh] += 1;
                }
            }
            else if (x === 2 & y === 0) {
                let is_same_right = true;
                let is_same_diagonal = true;
                
                for (let i = 1; i < 3; i++) {
                    if (oh !== boards[x][i]) {
                            is_same_right = false;
                            break;
                    };
                }
                    
                if (is_same_right) {
                    result[oh] += 1;
                }
                
                for (let i = 0; i < 3; i++) {
                    if (oh !== boards[x - i][i]) {
                        is_same_diagonal = false;
                        break;
                    };
                }
                
                if (is_same_diagonal) {
                    result[oh] += 1;
                }
            }
            // 직선 체크
            else {
                if (x === 0) {
                    let is_same = true;
                    for (let i = 1; i < 3; i++) {
                        if (oh !== boards[i][y]) {
                            is_same = false;
                            break;
                        };
                    }
                    
                    if (is_same) {
                        result[oh] += 1;
                    }
                } else {
                    let is_same = true;
                    for (let i = 1; i < 3; i++) {
                        if (oh !== boards[x][i]) {
                            is_same = false;
                            break;
                        };
                    }
                    
                    if (is_same) {
                        result[oh] += 1;
                    }
                }
            }
            
        }
    }
    
    return result;
}

function solution(board) {
    var answer = -1;
    
    const number = chk_dot_number(board);
    
    if (number === 0) {
        return 1;
    } else if (number === 1) {
        let cnt = count_oh(board, 'O');
        
        if (cnt === 1) return 1;
        else return 0;
    } else if (number % 2 === 0) {
        // ooo, xxx 중 하나라도 있으면 비정상임
        let chk_lines = chk_3line(board);
        
        if (chk_lines['O'] >= 1) return 0;
        if (chk_lines['X'] >= 2) return 0;
        
        // o = x만 정상
        let cnt_oh_0 = count_oh(board, 'O');
        let cnt_oh_X = count_oh(board, 'X');
        
        if (cnt_oh_0 !== cnt_oh_X) return 0;
        
        return 1;
    } else if (number % 2 === 1) {
        // ooo, xxx 중 두개 다 있으면 비정상임
        let chk_lines = chk_3line(board);
        if (chk_lines['X'] >= 1) return 0;
        
        // o == x + 1만 정상
        let cnt_oh_0 = count_oh(board, 'O');
        let cnt_oh_X = count_oh(board, 'X');
        
        if (cnt_oh_0 !== cnt_oh_X + 1) return 0;
        
        // 나머지 정상
        return 1;
    }
    return answer;
}
