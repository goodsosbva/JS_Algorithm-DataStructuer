// 이거 왜 오류?
function makePluseNum(n) {
    var number = [n]
    var ans = []
    
    while (true) {
        var tp = number.slice();
        ans.push(tp)
        var tmp = number.pop();
        console.log(tmp);
        if (tmp !== 1) {
            number.push(tmp - 1)
            number.push(1)
        }
        else {
            var base = 2;
            for(let i = 0; i < number.length; i++){
                if (number && number[-1] === 1){
                    base += 1;
                    number.pop();
                }
            }
            if(!number) break;
            
            var pivot = number.pop() - 1;
            number.push(pivot)
            while (base > pivot) {
                number.push(pivot)
                base -= pivot
            }
            number.push(base)
        }
    }
    return ans;
}

const solution = (n, money) => {
    let ans = 0;
    let dp = Array(n + 1).fill(0);
    dp[0] = 1;
    money.forEach((don, idx) => {
        // console.log(don, idx)
        for (let i = don; i < n + 1; i++) {
            dp[i] += dp[i - don];
            // console.log(dp)
        }
    });
    ans = dp[n] % 1000000007;
    // console.log(dp)
    return ans
}

console.log(solution(5, [1, 2, 5]))