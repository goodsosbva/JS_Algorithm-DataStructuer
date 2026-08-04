function is_stright_bool(corner, a, b) {
    const ax = a[0] - corner[0];
    const ay = a[1] - corner[1];

    const bx = b[0] - corner[0];
    const by = b[1] - corner[1];

    return ax * by - ay * bx === 0;
}


function is_stright_chk_caculate(vertexs, sts, ball) {
    let a = sts;
    let b = ball;
    
    let result = [];
    
    for (const vertex of vertexs) {
        const a_length = Math.sqrt(Math.abs(a[0] - vertex[0]) ** 2 + Math.abs(a[1] - vertex[1]) ** 2);
        const b_length = Math.sqrt(Math.abs(b[0] - vertex[0]) ** 2 + Math.abs(b[1] - vertex[1]) ** 2);
        
        if (is_stright_bool(vertex, sts, ball) && a_length < b_length) {
            result.push((a_length + b_length) ** 2);
        }
    }
    
    return result;
}


function is_block(sts, ball, direction) {
    const x = ball[0] - sts[0];
    const y = ball[1] - sts[1];

    if (direction[0] === -1) {
        return y === 0 && x < 0;
    }

    if (direction[0] === 1) {
        return y === 0 && x > 0;
    }

    if (direction[1] === 1) {
        return x === 0 && y > 0;
    }

    if (direction[1] === -1) {
        return x === 0 && y < 0;
    }
}
    

function solution(m, n, startX, startY, balls) {
    var answer = []; 
    
    let stx = startX;
    let sty = startY;
    
    let vertex1 = [0, 0];
    let vertex2 = [m, 0];
    let vertex3 = [0, n];
    let vertex4 = [m, n];
    
    const LEFT   = [-1, 0];
    const RIGHT  = [1, 0];
    const UP     = [0, 1];
    const DOWN   = [0, -1];
    
    let vertexs = [vertex1, vertex2, vertex3, vertex4]
    let sts = [stx, sty];
    
    let ans = [];
    
    for (const ball of balls) {
        const is_stright_lengths = is_stright_chk_caculate(vertexs, sts, ball);
        
        ans = [];
        ans.push(...is_stright_lengths);
        
        // 위
        const is_top_block = is_block(sts, ball, UP);

        if (!is_top_block) {
            const top_len = Math.abs(ball[1] - n)

            const new_ball = [ball[0], ball[1] + 2 * top_len];
            const length = Math.abs(sts[0] - new_ball[0]) ** 2 + Math.abs(sts[1] - new_ball[1]) ** 2
            ans.push(length);
        }

        // 아래
        const is_bottom_block = is_block(sts, ball, DOWN);
        if (!is_bottom_block) {
            const new_ball = [ball[0], -ball[1]];
            const length = Math.abs(sts[0] - new_ball[0]) ** 2 + Math.abs(sts[1] - new_ball[1]) ** 2
            ans.push(length);
        }


        // 왼
        const is_left_block = is_block(sts, ball, LEFT);

        if (!is_left_block) {
            const new_ball = [-ball[0], ball[1]];
            const length = Math.abs(sts[0] - new_ball[0]) ** 2 + Math.abs(sts[1] - new_ball[1]) ** 2
            ans.push(length);
        }

        // 오
        const is_right_block = is_block(sts, ball, RIGHT);

        if (!is_right_block) {
            const right_len = Math.abs(m - ball[0])

            const new_ball = [ball[0] + 2 * right_len, ball[1]];
            const length = Math.abs(sts[0] - new_ball[0]) ** 2 + Math.abs(sts[1] - new_ball[1]) ** 2
            ans.push(length);
        }

        
        answer.push(Math.min(...ans));
        
    }
    
    return answer;
}
