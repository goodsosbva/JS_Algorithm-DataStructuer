function solution(participant, completion) {
  var answer = "";

  let hashs = {};
  for (let i = 0; i < participant.length; i++) {
    if (!hashs[participant[i]]) {
      hashs[participant[i]] = 1;
    } else {
      hashs[participant[i]] += 1;
    }
  }

  for (const comp of completion) {
    if (hashs[comp]) {
      hashs[comp] -= 1;
    }
  }

  for (const hash in hashs) {
    if (hashs[hash] > 0) {
      answer += hash;
    }
  }
  return answer;
}
