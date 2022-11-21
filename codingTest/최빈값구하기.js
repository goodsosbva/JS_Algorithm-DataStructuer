function solution(array) {
    var answer = 0;
    var ans = [];
    
    const result = {};
    array.forEach((x) => { 
    result[x] = (result[x] || 0) + 1; 
    });
    
    var maxCnt = -1
    
    for (let key in result) {
        ans.push([key, result[key]]);
    }
    
    ans.sort((a, b) => b[1] - a[1])
    maxCnt = parseInt(ans[0][0])
    var cnt = 0;
    for (r in result) {
        if (result[r] === parseInt(ans[0][1])) {
            cnt++;
        }
        if (cnt >= 2) {
            return -1
        }
    }
    
    if (cnt >= 2) {
            return -1
    }
    
    return parseInt(maxCnt);
}
