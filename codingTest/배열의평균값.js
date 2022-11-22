// in 사용
function solution(numbers) {
    var answer = 0;
    
    for (n of numbers) {
        answer += n;
    }
    return answer / numbers.length;
}

// reduce 사용
function solution(numbers) {
    var answer = numbers.reduce((a,b) => a + b, 0) / numbers.length;
    return answer;
}

// forEach 사용
function solution(numbers) {
    var answer = 0;
    numbers.forEach(arg => answer = answer + arg);
    return answer / numbers.length;
}
