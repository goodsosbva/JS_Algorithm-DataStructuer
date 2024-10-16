const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = "";

rl.on("line", (line) => {
  input += line;
});

rl.on("close", () => {
  const result = calculateBracketValue(input);
  console.log(result);
  process.exit(0);
});

function calculateBracketValue(str) {
  let stack = [];
  let tmp = 1;
  let answer = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(") {
      tmp = tmp * 2;
      stack.push(char);
    } else if (char === "[") {
      tmp = tmp * 3;
      stack.push(char);
    } else if (str[i] === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") {
        return 0;
      }
      if (str[i - 1] === "(") answer += tmp;
      tmp = tmp / 2;
      stack.pop();
    } else if (str[i] === "]") {
      if (stack.length === 0 || stack[stack.length - 1] !== "[") {
        return 0;
      }
      if (str[i - 1] === "[") answer += tmp;
      tmp = tmp / 3;
      stack.pop();
    }
  }

  return stack.length === 0 ? answer : 0;
}
