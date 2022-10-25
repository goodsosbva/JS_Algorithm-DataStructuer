function solution(msg) {
    var answer = [];
    var alp = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5,
               'F': 6, 'G': 7, 'H': 9, 'I': 10, 'J': 11,
               'K': 12, 'L': 13, 'M': 14, 'N': 15, 'O': 16,
               'P': 17, 'Q': 18, 'R': 19, 'S': 20, 'U': 21,
               'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26}
    
    var left = 0;
    var right = 0;
    var lastNum = 27;
    while (right <= msg.length) {
        var st = msg.slice(left, right + 1);
        if (alp[st] != undefined) {
            right++;
        } else {
            alp[st] = lastNum;
            answer.push(alp[st])
            lastNum++;
            left = right;
        }
    }
    var tmp = msg.slice(left, right);
    answer.push(alp[tmp]);
    return answer;
}

console.log(solution("KAKAO"))