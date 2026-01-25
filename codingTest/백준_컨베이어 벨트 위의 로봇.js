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
  const [n, k] = input[0].split(" ").map(Number);
  const convelt = input[1].split(" ").map(Number);

  const result = solution(n, k, convelt);
  console.log(result);
  process.exit(0);
});

function checkConvelt(convelt) {
  let count = 0;

  for (let i = 0; i < convelt.length; i++) {
    if (convelt[i] === 0) {
      count++;
    }
  }

  return count;
}

function rotate(belt, robots) {
  belt.unshift(belt.pop());
  robots.unshift(robots.pop());
}

function solution(n, k, convelt) {
  let answer = 0;
  const robots = Array(convelt.length).fill(false);
  while (true) {
    answer++;

    // 1. 벨트 회전
    rotate(convelt, robots);
    // 즉시 내린다
    robots[n - 1] = false;

    // 2. 로봇 이동
    for (let i = n - 2; i >= 0; i--) {
      if (robots[i] && !robots[i + 1] && convelt[i + 1] > 0) {
        robots[i] = false;
        robots[i + 1] = true;
        convelt[i + 1]--;
      }
    }
    // 즉시 내린다
    robots[n - 1] = false;

    // 3. 로봇 올림
    if (convelt[0] > 0 && !robots[0]) {
      robots[0] = true;
      convelt[0]--;
    }

    // 4. 종료 체크
    if (checkConvelt(convelt) >= k) break;
  }

  return answer;
}
