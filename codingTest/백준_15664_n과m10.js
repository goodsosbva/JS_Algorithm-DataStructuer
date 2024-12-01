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
    solution(input);
    process.exit(0);
});

function solution(input) {
    const [n,m] = input[0].split(" ").map(Number);
    const numbers = input[1]
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b);
    const arr = Array.from({length: m}, () => 0);
    const answer = [];

    let count = {};
    numbers.forEach((num) => {
        count[num] = (count[num] || 0) + 1;
    })

    const uniqueNumbers = [...new Set(numbers)];

    recursive(0, m, uniqueNumbers, answer, count, arr, 0);

    console.log(answer.join('\n'));
}

function recursive(k, m, numbers, answer, count, arr, start) {
    if (k === m) {
        answer.push(arr.join(" "));
        return;
    }

    for (let i = start; i < numbers.length; i++) {
        if (count[numbers[i]] > 0) {
            arr[k] = numbers[i];
            count[numbers[i]] -= 1;
            recursive(k + 1, m, numbers, answer, count, arr, i);
            count[numbers[i]] += 1;
        }
    }
}
