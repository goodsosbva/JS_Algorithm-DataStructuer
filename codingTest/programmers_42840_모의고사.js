function solution(answers) {
  var answer = [];
  var patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const score = [0, 0, 0];

  for (const [i, answer] of answers.entries()) {
    for (const [j, pattern] of patterns.entries()) {
      if (pattern[i % pattern.length] === answer) {
        score[j] += 1;
      }
    }
  }

  const MaxScore = Math.max(...score);
  const heightScore = [];
  for (let i = 0; i < score.length; i++) {
    if (score[i] === MaxScore) {
      answer.push(i + 1);
    }
  }
  return answer;
}
