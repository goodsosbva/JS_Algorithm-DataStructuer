function solution(t, p) {
  var answer = 0;

  let length = p.length;

  for (let i = 0; i <= t.length - length; i++) {
    const candi = t.slice(i, i + length);

    if (candi <= p) answer += 1;
  }
  return answer;
}
