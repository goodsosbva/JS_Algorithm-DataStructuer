function solution(n, k, cmd) {
  const deleted = [];

  const up = [...new Array(n + 2)].map((_, i) => i - 1);
  const down = [...new Array(n + 2)].map((_, i) => i + 1);

  k += 1;

  for (const item of cmd) {
    if (item[0] === "C") {
      deleted.push(k);
      up[down[k]] = up[k];
      down[up[k]] = down[k];

      k = n < down[k] ? up[k] : down[k];
    } else if (item[0] === "Z") {
      const restoration = deleted.pop();
      up[down[restoration]] = restoration;
      down[up[restoration]] = restoration;
    } else {
      const [act, num] = item.split(" ");
      if (act === "U") {
        for (let i = 0; i < num; i++) {
          k = up[k];
        }
      } else {
        for (let i = 0; i < num; i++) {
          k = down[k];
        }
      }
    }
  }

  const answer = new Array(n).fill("O");
  for (const i of deleted) {
    answer[i - 1] = "X";
  }
  return answer.join("");
}
