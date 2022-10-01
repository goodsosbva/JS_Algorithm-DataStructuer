function solution(s)
{
    var answer = 0;
    
    var st = 0;
    var ed = s.length - 1;
    var tmp = 0;
    var firstFront = true;
    while (true) {
        tmp++;
        console.log(st, ed)
        if (s[st] === s[ed]) {
            var cnt = 0;
            while(true) {
                st++;
                ed--;
                cnt += 2;
                if (s[st] !== s[ed]) break;
                if (st === ed) {
                    cnt++;
                    answer = Math.max(answer, cnt);
                    break;
                }
                if (st > ed) {
                    answer = Math.max(answer, cnt);
                    break;
                }
            }
        }
        else if (firstFront) {
            st++;
            if (st === ed) {
                firstFront = false;
                st = 0;
            }
        } 
        else if (!firstFront) {
            ed--;
            if (st === ed) break;
        }
        if (tmp === 10) break;
        if (st === ed) break;
    }

    return answer;
}

console.log(solution("abacde"))