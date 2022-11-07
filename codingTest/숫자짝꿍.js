function solution(X, Y) {
    var answer = '';
    var dic = {}
    
    for (let i = 0; i < X.length; i++) {
        if (dic[X[i]] === undefined) {
            dic[X[i]] = [1, 0]
        }
        else {
            dic[X[i]][0] += 1 
        }
    }
    
    for (let i = 0; i < Y.length; i++) {
        if (dic[Y[i]] === undefined) continue;
        else {
            dic[Y[i]][1] += 1 
        }
    }
    
    var candi = ""
    
    var a = -1
    var b = -1
    for (d in dic) {
        var cnt = Math.min(dic[d][0], dic[d][1])
        
        // console.log(d, dic[d][0], dic[d][1], cnt)
        if (cnt != 0) {
            for (let i = 0; i < cnt; i++) {
                candi += d
            }   
        }
    }
    
    
    if (candi === "") {
        return "-1";
    // ^: 해당 문자열을 제외한이라는 뜻     
    } else if (candi.match(/[^0]/g) === null) {
        return "0";
    } else {
        return [...candi].sort().reverse().join("");
    }
    return candi;
}
