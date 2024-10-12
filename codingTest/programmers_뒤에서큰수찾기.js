function solution(numbers) {
    var answer = new Array(numbers.length).fill(-1); 
    var stack = []; 

    for (let i = numbers.length - 1; i >= 0; i--) {
        const cur = numbers[i];
        
        if (stack.length === 0) {
            stack.push(cur);
            continue;
        }
        
        if (stack.length > 0 && stack[stack.length - 1] > cur) {
            answer[i] = stack[stack.length - 1];
            stack.push(cur);
        } else {
            while (stack.length && stack[stack.length - 1] <= cur) {
                stack.pop();
            }
            
            if (stack.length > 0) {
                answer[i] = stack[stack.length - 1];
            }
            stack.push(cur);
        }
    }
    
    return answer;
}
