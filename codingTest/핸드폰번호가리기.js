function solution(phone_number) {
    var answer = '';
    
    var cnt = 0;
    for (let i = phone_number.length - 1; i >= 0; i--) {
        if (cnt < 4) {
            answer += phone_number[i];
            cnt++
        }
        else {
            answer += "*"
        }
    }
    
    answer = answer.split('').reverse().join('');
    return answer;
}
