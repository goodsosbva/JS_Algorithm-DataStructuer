function solution(denum1, num1, denum2, num2) {
    var answer = [];
    let denum = num1 * denum2 + num2 * denum1
    let num = num1 * num2
    
    // 약분할 값 스타트
    let start = 1

    // 약분
    for (let i = 1; i <= denum; i++) {
        // 2개가 나눠지면 약분되는 것이므로...
        if (denum % i === 0 && num % i === 0) {
            start = i
        }
    }

    answer.push(denum / start);
    answer.push(num / start);
    return answer;
}