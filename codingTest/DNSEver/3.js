function solution(s) {
    var answer = 0;

    var candi = [];
    s = [...s]
    for (let i = 0; i < s.length; i++) {
        var tmp = ""
        for (let j = i; j < s.length; j++) {
            tmp += s[j];
            candi.push(tmp);
        }
    }
    
    // 중복 제거
    const setCandi = new Set(candi);
    candi = Array.from(setCandi);

    for (let k = 0; k < candi.length; k++) {
        var proper = true;
        for (let l = 0; l < candi[k].length; l++) {
            var test = [...candi[k]];
            let count = test.filter(element => candi[k][l] === element).length;
            if (count > 1) {
                proper = false;
                break;
            }
        }
        if (proper) {
            answer++;
        }
    }
    return answer;
}

// 입력값 〉
// "abac"
// 기댓값 〉
// 7