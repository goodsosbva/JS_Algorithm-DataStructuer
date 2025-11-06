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
  const [T, W] = input[0].split(" ").map(Number);
  const trees = input.slice(1).map(Number);

  const result = solvePlum(T, W, trees);
  console.log(result);
  process.exit(0);
});

function solvePlum(T, W, trees) {
  function dfs(time, move, pos) {
    if (time === T) return 0;
    if (move > W) return -Infinity;

    const gain = trees[time] === pos ? 1 : 0;

    const stay = dfs(time + 1, move, pos);

    const moveNext = dfs(time + 1, move + 1, 3 - pos);

    return gain + Math.max(stay, moveNext);
  }

  return dfs(0, 0, 1);
}
