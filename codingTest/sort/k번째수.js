function solution(array, commands) {
    var answer = [];
    
    for (let i = 0; i < commands.length; i++) {
        const [st, end, k] = commands[i];
        const slice_array = array.slice(st - 1, end)
        
        slice_array.sort((a, b) => a - b);
        console.log(slice_array)
        answer.push(slice_array[k - 1])
    }
    return answer;
}

answer = solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]);
console.log(answer);