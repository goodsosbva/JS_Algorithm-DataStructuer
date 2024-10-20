const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const n = parseInt(input[0]);
  const m = parseInt(input[1]);
  let buttons = new Set(Array.from({ length: 10 }, (_, i) => i.toString()));
  let newbutton = [];

  if (m !== 0) {
    const errbuttons = input[2].split(" ");
    newbutton = Array.from(buttons).filter((b) => !errbuttons.includes(b));
  } else {
    newbutton = Array.from(buttons);
  }

  let minCount = Math.abs(100 - n);

  for (let num = 0; num <= 1000000; num++) {
    const strNum = num.toString();

    let isValid = true;
    for (let j = 0; j < strNum.length; j++) {
      if (!newbutton.includes(strNum[j])) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      const pressCount = Math.abs(n - num) + strNum.length;
      minCount = Math.min(minCount, pressCount);
    }
  }

  console.log(minCount);
  process.exit(0);
});
