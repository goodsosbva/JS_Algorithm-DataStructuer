const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  let idx = 0;
  const next = () => input[idx++];
  const n = Number(next());

  const result = solution(n);
  console.log(result);
  process.exit(0);
});

function solution(n) {
  const count = Array(10).fill(0);

  let start = 1;
  let end = n;
  let digit = 1;

  function add(num) {
    while (num > 0) {
      count[num % 10] += digit;
      num = Math.floor(num / 10);
    }
  }

  while (start <= end) {
    // 오른쪽 제거
    while (end % 10 !== 9 && start <= end) {
      add(end);
      end -= 1;
    }

    if (start > end) break;

    while (start % 10 !== 0 && start <= end) {
      add(start);
      start += 1;
    }

    if (start > end) break;

    const plus = Math.floor(end / 10) - Math.floor(start / 10) + 1;
    for (let i = 0; i <= 9; i++) {
      count[i] += plus * digit;
    }

    start = Math.floor(start / 10);
    end = Math.floor(end / 10);
    digit = digit * 10;
  }

  return count.join(" ");
}
