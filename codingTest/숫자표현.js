function solution(n) {
  let answer = 0;
  // 완탐식
  for (let i = 1; i <= n; i++) {
    let temp = i;
    for (let j = i + 1; j <= n; j++) {
      temp += j;
      if (temp === n) answer++;
      else if (temp > n) break;
    }
  }
  return answer + 1;
}

function solution1(n) {
    let answer = 0;
    
    for(let i = 0; i <= n; i++) {
        if(n%i === 0 && i%2 === 1) answer++;
    }
    
    return answer;
}

console.log(solution(15));