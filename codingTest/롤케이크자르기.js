function solution(topping) {
    var answer = 0;
    
    for (let i = 1; i < topping.length - 1; i++) {
        var cake1 = topping.slice(0, i);
        var cake2 = topping.slice(i, topping.length);
        
        const setCake1 = new Set(cake1)
        const setCake2 = new Set(cake2)
        if (setCake1.size === setCake2.size) {
            answer++;
        }
    }
    
    return answer;
}

function solution(topping) {
    var answer = 0;
    
    var dic = {};
    for (let i = 0; i < topping.length; i++) {
        if (dic[topping[i]] === undefined) {
            dic[topping[i]] = 1
        } else {
            dic[topping[i]] += 1
        }
    }
    
    var set = new Set();
    for (let i = 0; i < topping.length; i++) {
        dic[topping[i]] -= 1;
        set.add(topping[i])
        
        if (dic[topping[i]] === 0) {
            // 딕셔너리 키 삭제
            delete dic[topping[i]];
        }
        // console.log(Object.keys(dic).length, set.size, dic, set)
        if (Object.keys(dic).length === set.size) {
            answer++;
        }
    }
    
    return answer;
}

// 다른 사람 풀이
function solution(topping) {
    const a = new Set()
    const b = {}

    let answer = 0;
    let check = 0

    for (let i = 0; i < topping.length; i++) {        
        if (b[topping[i]]) {
            b[topping[i]]++
        } else {
            b[topping[i]] = 1
            check++            
        }
    }

    for (let i = 0; i < topping.length; i++) {
        a.add(topping[i])
        b[topping[i]]--

        if (!b[topping[i]]) check--
        if (a.size === check) answer++
    }


    return answer;
}


// 내가 푼 통과된 답압
function solution(topping) {
    var answer = 0;
    
    var dic = {};
    var cnt = 0;
    for (let i = 0; i < topping.length; i++) {
        if (dic[topping[i]] == undefined) {
            dic[topping[i]] = 1
            cnt++;
        } else {
            dic[topping[i]] += 1
        }
    }
    
    var set = new Set();
    for (let i = 0; i < topping.length; i++) {
        dic[topping[i]] -= 1;
        set.add(topping[i])
        
        
        if (dic[topping[i]] === 0) {
            // 딕셔너리 키 삭제
            // 삭제 부분 최적화
            // delete dic[topping[i]];
            cnt--;
        }
        // console.log(Object.keys(dic).length, set.size, dic, set)
        if (cnt === set.size) {
            answer++;
        }
    }
    
    return answer;
}