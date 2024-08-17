function solution(numbers) {
  var answer = [];

  var ans = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      ans.push(numbers[i] + numbers[j]);
    }
  }

  answer = [...new Set(ans)].sort((a, b) => a - b);
  return answer;
}
