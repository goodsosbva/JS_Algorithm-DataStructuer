// Math.floor(Math.random() * 11)
var input = '1234567890';
var answer = '';

dic = {}
for (let i = 0; i < input.length; i++){
    var isBreak = true;
    while (isBreak) {
        var randomIdx = Math.floor(Math.random() * 10)
        if (dic[randomIdx] === undefined) {
            dic[randomIdx] = 1;
            answer += input[randomIdx];
            isBreak = false
        }
        else {
            continue
        }
    }
}

console.log(answer);