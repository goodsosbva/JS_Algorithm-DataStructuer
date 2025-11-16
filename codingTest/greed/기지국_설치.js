function solution(n, stations, w) {
  let answer = 0;
  let location = 1;
  let idx = 0;

  while (location <= n) {
    if (
      idx < stations.length &&
      location >= stations[idx] - w &&
      location <= stations[idx] + w
    ) {
      location = stations[idx] + w + 1;
      idx += 1;
    } else {
      answer += 1;
      location = location + 2 * w + 1;
    }
  }

  return answer;
}

const n = 11;
const stations = [4, 11];
const w = 1;
const result = solution(n, stations, w); // 3
console.log(result);
