const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = "";

rl.on("line", (line) => {
    input = line;
    rl.close();
});

rl.on("close", () => {
    solution(input);
    process.exit(0);
});

function solution(input) {
    const k = parseInt(input);

    // 2^k - 1 의 값을 출력
    const totalMoves = (BigInt(2) ** BigInt(k)) - BigInt(1);
    console.log(totalMoves.toString());

    if (k <= 20) {
        const result = [];
        recursive(1, 3, k, result);
        console.log(result.join("\n"));
    }
}

function recursive(a, b, n, result) {
    if (n === 1) {
        result.push(`${a} ${b}`);
        return;
    }

    recursive(a, 6 - a - b, n - 1, result);
    result.push(`${a} ${b}`);
    recursive(6 - a - b, b, n - 1, result);
}
