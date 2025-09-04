function compare(a, b) {
    const s1 = a.toString() + b.toString();
    const s2 = b.toString() + a.toString();
    
    return s1 >= s2 ? -1 : 1
}

function solution(numbers) {
    const sorted_number = numbers.sort(compare)
    
    const answer = sorted_number.join("")
    return Number(answer) === 0 ? "0" : answer;
}