function solution(order) {
    var answer = 0;
    
    const stack = [];
    let odx = 0;
    let ndx = 0;
    let numbers = Array.from({length: order.length}, (_, i) => i + 1);
    while (numbers.length > ndx) {
        const number = numbers[ndx];
        
        if (number === order[odx]) {
            ndx += 1;
            odx += 1;
            answer += 1;
            
           
            while (odx < order.length && stack[stack.length - 1] === order[odx]) {
                stack.splice(stack.length - 1, 1);
                odx += 1;
                answer += 1;
            } 
        } else {
            while (odx < order.length && stack[stack.length - 1] === order[odx]) {
                stack.splice(stack.length - 1, 1);
                odx += 1;
                answer += 1;
            } 
            
            if (number !== order[odx]) stack.push(number);
            ndx += 1;
        }
    }
    
    return answer;
}
