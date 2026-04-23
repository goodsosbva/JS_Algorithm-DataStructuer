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

  const n = Number(next());
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(next());
  }
  const k = Number(next());

  console.log(solution(n, arr, k));
  process.exit(0);
});

function solution(n, arr, k) {
  const lens = arr.map((s) => s.length);
  const mods = arr.map((s) => getModFromString(s, k));

  const maxLen = Math.max(...lens);
  const pow10 = Array(maxLen + 1).fill(0);
  pow10[0] = 1 % k;

  for (let i = 1; i <= maxLen; i++) {
    pow10[i] = (pow10[i - 1] * 10) % k;
  }

  const size = 1 << n;
  const dp = Array.from({ length: size }, () => Array(k).fill(0n));
  dp[0][0] = 1n;

  for (let mask = 0; mask < size; mask++) {
    for (let r = 0; r < k; r++) {
      if (dp[mask][r] === 0n) continue;

      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) continue;

        const nextMask = mask | (1 << i);
        const nextR = (r * pow10[lens[i]] + mods[i]) % k;

        dp[nextMask][nextR] += dp[mask][r];
      }
    }
  }

  const numerator = dp[size - 1][0];
  let denominator = 1n;

  for (let i = 2n; i <= BigInt(n); i++) {
    denominator *= i;
  }

  if (numerator === 0n) return "0/1";

  const g = gcd(numerator, denominator);
  return `${numerator / g}/${denominator / g}`;
}

function getModFromString(s, k) {
  let r = 0;
  for (const ch of s) {
    r = (r * 10 + Number(ch)) % k;
  }
  return r;
}

function gcd(a, b) {
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
