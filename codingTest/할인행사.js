function solution(want, number, discount) {
    var answer = 0;
    
    var dic = {};
    for (let i = 0; i < want.length; i++) {
        dic[want[i]] = number[i];
    }
    console.log(dic);
    for (let i = 0; i < discount.length; i++) {
        let wantDic = {}
        let isCover = true;
        for (let j = i; j < i + 10; j++) {
            if (wantDic[discount[j]] === undefined) {
                wantDic[discount[j]] = 1
            }
            else {
                wantDic[discount[j]] += 1;
            }
        }
        
        console.log(wantDic);
        // 되는지 chk
        for (let k = 0; k < want.length; k++) {
            if (dic[want[k]] <= wantDic[want[k]]) continue;
            else {
                isCover = false;
                break
            }
        }
        
        if (isCover) {
            answer += 1;
        }
    }
    return answer;
}


console.log(solution(["banana", "apple", "rice", "pork", "pot"], [3, 2, 2, 2, 1], ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]))