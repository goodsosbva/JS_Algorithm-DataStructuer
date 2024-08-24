function solution(N, stages) {
  const challenger = new Array(N + 2).fill(0);
  for (const stage of stages) {
    challenger[stage] += 1;
  }

  let total = stages.length;
  let fails = {};
  for (let i = 1; i < N + 1; i++) {
    if (challenger[i] === 0) {
      fails[i] = 0;
      continue;
    }

    fails[i] = challenger[i] / total;
    total -= challenger[i];
  }

  const answer = Object.entries(fails).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0] - b[0];
    } else {
      return b[1] - a[1];
    }
  });

  return answer.map((item) => Number(item[0]));
}
