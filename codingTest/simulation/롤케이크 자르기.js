function solution(topping) {
    let answer = 0;
    
    let eat_topping = {};
    for (let i = 0; i < topping.length; i++) {
        eat_topping[topping[i]] = (eat_topping[topping[i]] || 0) + 1;
    }
    
    const Cheolsu = new Set();
    let eat_cheolsu_brother = Object.keys(eat_topping).length;
    for (let i = 0; i < topping.length; i++) {
        Cheolsu.add(topping[i]);
        eat_topping[topping[i]] -= 1;
        
        if (eat_topping[topping[i]] === 0) {
            eat_cheolsu_brother -= 1;
        }
        
        if (Cheolsu.size === eat_cheolsu_brother) answer += 1;
    }
    
    return answer;
}