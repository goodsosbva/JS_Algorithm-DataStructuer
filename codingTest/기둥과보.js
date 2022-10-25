var x = 1
var y = 2
var stuff = 5;
var oper = 2;

var answer = [[1, 2, 5, 2], [7, 7, 7, 7]];

console.log(answer);
answer = answer.filter((ele) => {
    (x, y, stuff, oper) !== (ele[0], ele[1], ele[2], ele[3])
});
console.log(answer);


console.log(answer.indexOf((7, 7, 7, 7)));


function possible(answer) {
    for (let i = 0; i < answer.length; i++) {
        var x = answer[i][0];
        var y = answer[i][1];
        var stuff = answr[i][2];
        
        // 설치 된게 기둥
        if (stuff === 0) {
            if ( y === 0 ) {
                continue;
            } else if (answer.find(ele => (ele[0] === x && ele[1] === (y - 1) && ele[2] === 0)) !== undefined) {
                continue;
            } else if (answer.find(ele => (ele[0] === x && ele[1] === (y) && ele[2] === 0)) !== undefined) {
                continue;
            } else if (answer.find(ele => (ele[0] === (x - 1) && ele[1] === (y) && ele[2] === 0)) !== undefined) {
                continue;
            } else {
                return false;
            }
        }
        
        // 설치 된게 보
        if (stuff === 1) {
            
        }
        return true;
    }
}


function solution(n, build_frame) {
    var answer = [[]];
    
    // [[1,0,0,1],[1,1,1,1],[2,1,0,1],[2,2,1,1],[5,0,0,1],[5,1,0,1],[4,2,1,1],[3,2,1,1]]
    for (let i = 0; i < build_frame.length; i++) {
        var x = build_frame[i][0];
        var y = build_frame[i][1];
        var stuff = build_frame[i][2];
        var oper = build_frame[i][3];
        
        // 삭제
        if (oper === 0) {
            answer = answer.filter((ele) => {
                (x, y, stuff, oper) !== (ele[0], ele[1], ele[2], ele[3])
            });
            if (!possible(answer)) {
                answer.push([x, y, stuff, oper])
            }
        }
    }
    return answer;
}