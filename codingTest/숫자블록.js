
function solution1(begin, end) {
    var n = end - begin + 1;
    const answer = Array.from({length: n + 1}, () => 0);
    
    let number = 1;
    while(true) {
        let isContinue = false;
        for (let i = 2; i < n ** n; i++) {
            if (i * number < n + 1) {
                isContinue = true;
                answer[i * number] = number;
            }
            else {
                break;
            }
        }
        number++;
        if (!isContinue) break;
    }
    
    return answer.splice(1, n + 1);
}

function solution (begin, end) {
    const arr = new Array(end - begin + 1).fill(0);
    
    for(let i = begin; i <= end; i++) {
        arr[i - begin] = getMaxDivisor(i);
        console.log(arr);
    }
    
    // 예외 처리
    if (begin === 1) arr[0] = 0;
    
    return arr;
  }
  
  const getMaxDivisor = (n) => {
    for(let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0 && n / i <= 1e7 ) {
        return n / i;
      }
    }
    return 1;
  }


console.log(solution(1, 10));