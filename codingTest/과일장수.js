function solution(k, m, score) {
    var answer = 0;
    
    score.sort((a, b) => b - a)
    
    var cnt = 0;
    var tmp = [];
    for (let i = 0; i < score.length; i++) {
        tmp.push(score[i])
        cnt++;
        
        if (cnt === m) {
            var minValue = Math.min(...tmp);
            answer += minValue * m
            cnt = 0;
            tmp = [];
        }
    }
    return answer;
}
