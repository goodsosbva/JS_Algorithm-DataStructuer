function solution(arr1, arr2) {
    var answer = [];
    
    for (let i = 0; i < arr1.length; i++) {
        var ans = [];
        for (let j = 0; j < arr1[0].length; j++) {
            var tmp = arr1[i][j] + arr2[i][j];
            ans.push(tmp);
        }
        answer.push(ans);
    }
    return answer;
}
