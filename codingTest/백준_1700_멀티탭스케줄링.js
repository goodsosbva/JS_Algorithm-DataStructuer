const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  let idx = 0;
  const next = () => input[idx++];

  const [n, k] = next().split(" ").map(Number);
  const electricalAppliances = next().split(" ").map(Number);

  console.log(solution(n, k, electricalAppliances));
  process.exit(0);
});

function solution(n, k, electricalAppliances) {
  let answer = 0;

  const positions = {};
  for (let i = 0; i < k; i++) {
    const device = electricalAppliances[i];
    if (!positions[device]) positions[device] = [];
    positions[device].push(i);
  }

  const pointer = {};
  for (const device in positions) {
    pointer[device] = 0;
  }

  const plugged = [];

  for (let i = 0; i < k; i++) {
    const now = electricalAppliances[i];

    pointer[now]++;

    if (plugged.includes(now)) continue;

    if (plugged.length < n) {
      plugged.push(now);
      continue;
    }

    let removeIndex = -1;
    let farthestNextUse = -1;

    for (let j = 0; j < plugged.length; j++) {
      const pluggedDevice = plugged[j];
      const nextIdx = positions[pluggedDevice][pointer[pluggedDevice]];

      if (nextIdx === undefined) {
        removeIndex = j;
        break;
      }

      if (nextIdx > farthestNextUse) {
        farthestNextUse = nextIdx;
        removeIndex = j;
      }
    }

    plugged[removeIndex] = now;
    answer++;
  }

  return answer;
}
