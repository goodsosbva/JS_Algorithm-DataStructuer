function solution(cacheSize, cities) {
    var answer = 0;
    var stack = [];
    
    for (let i = 0; i < cities.length; i++) {
        console.log(stack)
        
        if (cacheSize === 0) {
            answer += 5;
            continue;
        }
        
        var newCities = cities[i].toUpperCase()
        if (stack.includes(newCities) === false && stack.length < cacheSize) {
            stack.push(newCities);
            answer += 5;
        } else if (stack.includes(newCities) === true) {
            var idx = stack.indexOf(newCities);
            stack.splice(idx, 1);
            stack.push(newCities);
            answer += 1;
        } else if (stack.includes(newCities) === false && stack.length >= cacheSize) {
            stack.splice(0, 1);
            stack.push(newCities);
            answer += 5;
        }
    }
    console.log(stack);
    return answer;
}

console.log(solution(3, ["1", "2", "3", "1"]));