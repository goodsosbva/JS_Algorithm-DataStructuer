function changeTwoNumber(num) {
    var ans = [];
    var tmp = 0;
    while (num !== 0) {
        tmp = num % 2;
        num = parseInt(num / 2);
        ans.push(tmp)
    }
    return ans.reverse()
}

function changeTenNumber(num) {
    let ans = 0;
    num.reverse();
    for (let i = 0; i < num.length; i++) {
        ans += (num[i] * (2 ** i));
    }
    return ans;
}

function solution(n) {
    ans = n.toString(2);
    ans = ans.split("")
    var candi = -1;
    var onCnt = ans.filter(element => '1' === element).length;
    
    var next = n + 1;
    while (true) {
        candi = next.toString(2);
        candi = candi.split("")
        candiCnt = candi.filter(ele => '1' === ele).length;

        if (candiCnt === onCnt) {
            return changeTenNumber(candi)
        }
        next++;
    }
}

// console.log(changeTenNumber([ 1, 0, 0, 1, 1 ]))
console.log(solution(14));