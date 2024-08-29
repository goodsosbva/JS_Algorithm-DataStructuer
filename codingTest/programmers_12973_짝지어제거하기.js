function solution(s)
{
    var answer = -1;
    
    let stack = [];
    stack.push(s[0])
    for (let i = 1; i < s.length; i++) {
        const top = stack[stack.length - 1];
        
        if (top === s[i]) stack.pop();
        else stack.push(s[i])
    }
    
    if (stack.length === 0) answer = 1;
    else answer = 0;
    return answer;
}