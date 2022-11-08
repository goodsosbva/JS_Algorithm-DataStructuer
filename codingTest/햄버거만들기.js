function solution1(ingredient) {
    var answer = 0;
    
    var idx = 0;
    var ans = "1231"
    while(true) {
        if (idx === ingredient.length) break;
        
        if (ingredient[idx] === 1) {
            var startIdx = idx;
            var i = 0;
            var tmp = "1";
            while (true) {
                if (tmp.length === 4) {
                    answer++;
                    var endIdx = idx;
                    var arr = [];
                    ingredient = arr.concat(ingredient.slice(0, startIdx), ingredient.slice(endIdx + 1, ingredient.length));
                    // arr.indexOf(1)
                    // var tmp = ingredient.slice(0, startIdx)
                    // var newStart = tmp.lastIndexOf(1);
                    idx = 0;
                    break;
                }
                idx++;
                i++;
                if (ingredient[idx] === parseInt(ans[i % 4])) {
                    tmp += String(ans[i % 4])
                    continue;
                    
                } else {
                    break;
                }
                
            }
        } else {
            idx++;
        }
        
    }
    return answer;
}


function solution2(ingredient) {
    var answer = 0;
    
    var idx = 0;
    var ans = "1231"
    var last = ingredient.length;
    while(true) {
        if (idx === last) break;
        
        if (ingredient[idx] === 1) {
            
            var candi = ingredient[idx] + String(ingredient[last - 3]) + String(ingredient[last - 2]) +
                String(ingredient[last - 1])
            
            if (candi === ans) {
                answer++;
                idx++;
                last -= 4;
            }
        } else {
            idx++;
        }
        
    }
    return answer;
}

function solution(ingredient) {
    let answer = 0;
    let tmp = [];
    const ans = "1231";

    for (let i = 0; i < ingredient.length; i++) {
        tmp.push(ingredient[i]);
        // 길이가 4 이상일 때부터 햄버거를 만들 수 있는지 뒤에서 부터 체크 하는 형식
        // 이런식으로 해서 앞에서 부터 pop할 때 다시 start지점을 찾는 부분을 최적화 되는 원리
        if (tmp.length >= 4) {
            let candi = tmp.slice(-4).join('');
       
            if (candi === ans) {
                answer++;
                for (let j = 0; j < 4; j++) {
                    tmp.pop();
                }
            }
        }
    }

    return answer;
}


// [1, 1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 1] 3
console.log(solution([1, 1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 1]))
