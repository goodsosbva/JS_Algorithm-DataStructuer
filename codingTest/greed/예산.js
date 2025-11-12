function solution(d, budget) {
  let answer = 0;
  const sorted_d = d.sort((a, b) => a - b);

  for (let i = 0; i < sorted_d.length; i++) {
    if (budget >= sorted_d[i]) {
      answer += 1;
      budget -= sorted_d[i];
    } else {
      break;
    }
  }

  return answer;
}

console.log(solution([1, 3, 2, 5, 4], 9)); // 3
