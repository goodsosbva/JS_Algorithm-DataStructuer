function solution(n, t, m, p) {
    var answer = '';
    
    const overNumber = {'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15}
    var cnt = 0;
    var order = 1;
    var tube = 0;
    var stp = 0;
    while (true) {
        var number = cnt.toString(n);
        console.log(number);
        for (let i = 0; i < number.length; i++) {
            console.log(number[i], order, order % p, answer, tube);
            if (order % m === p || (m === p && order % m === 0)) {
                answer += number[i].toUpperCase();
                tube++;
            }

            if (tube >= t) {
                return answer;
            }
            order++;
        }
        cnt++;
        if (tube >= t){
            return answer;
        }

        // stp++;
        // if (stp === 10) {
        //     break;
        // }
    }
}

console.log(solution(16, 16, 2, 2));