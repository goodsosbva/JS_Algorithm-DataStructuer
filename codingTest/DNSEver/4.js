function solution(p)
{
    var answer = 0;
    
    const result = {};
    p.forEach((x) => { 
    result[x] = (result[x] || 0) + 1; 
    });

    var maxV = -1;
    for (r in result) {
        if (result[r] > maxV) {
            maxV = result[r];
        } 
    }
    // 중복 x
    if (maxV === 1) {
        return p.length - 1;
    }
    // 중복 o
    var cal = []
    for (r in result) {
        var tmp = [];
        for (r in result) {
            if (result[r] > 0) {
                result[r] -= 1; 
                tmp.push(r)
            }   
        }
        if (tmp.length !== 0) {
            cal.push(tmp);
        }
    }

    // console.log(cal);
    
    for (let i = 0; i < cal.length; i++) {
        // console.log(cal[i].length - 1)
        answer += cal[i].length - 1;
    }
    return answer;
}

// 입력값 〉
// [103, 101, 103, 103, 101, 102, 100, 100, 101, 104]
// 기댓값 〉
// 7

console.log(solution([103, 101, 103, 103, 101, 102, 100, 100, 101, 104]))