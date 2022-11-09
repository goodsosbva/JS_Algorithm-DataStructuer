function solution(food) {
    var answer = '';
    
    var newFood = [];
    for (let i = 1; i < food.length; i++) {
        var f = parseInt(food[i] / 2);
        
        newFood.push(f)
    }
    var n = 1;
    for (let j = 0; j < newFood.length; j++) {
        for (let k = 0; k < newFood[j]; k++) {
            answer += n
        }
        n++;
    }
    var tmp = answer.split('').reverse().join('')
    answer += "0"
    answer += tmp
    return answer;
}
