function solution(numbers) {
    var answer = 0;
    
    const hadntnumbers = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < numbers.length; i++) {
        if (hadntnumbers.has(numbers[i])) {
            hadntnumbers.delete(numbers[i])
        }
    }
    
    for (num of hadntnumbers) {
        answer += num;
    }
    return answer;
}
