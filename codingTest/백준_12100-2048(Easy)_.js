const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    const n = Number(input[0]);
    let idx = 1;
    let maps = [];

    for (let i = 0; i < n; i++) {
        const map = input[idx++].split(" ").map(Number);
        maps.push(map);
    }

    let maxValue = 0;
    for (let tmp = 0; tmp < 1024; tmp++) {
        let maps2 = JSON.parse(JSON.stringify(maps));

        let bruteForce = tmp;
        for (let i = 0; i < 5; i++) {
            let digit = bruteForce % 4;
            bruteForce = Math.floor(bruteForce / 4);
            maps2 = tilt(maps2, digit);
        }

        maxValue = Math.max(maxValue, getMax(maps2))
    }

    console.log(maxValue);

    function getMax(map) {
        let tmpMax = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                tmpMax = Math.max(tmpMax, map[i][j]);
            }
        }

        return tmpMax;
    }

    function rotate(maps) {
        const tmp = Array.from({ length: n }, () => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                tmp[j][n - 1 - i] = maps[i][j];
            }
        }

        return tmp;
    }


    function tilt(board, dir) {
        for (let i = 0; i < dir; i++) {
            board = rotate(board);
        }

        for (let i = 0; i < n; i++) {
            const tilted = Array(n).fill(0);
            let idx = 0;

            for (let j = 0; j < n; j++) {
                if (board[i][j] === 0) continue;
                if (tilted[idx] === 0) {
                    tilted[idx] = board[i][j];
                } else if (tilted[idx] === board[i][j]) {
                    tilted[idx] = board[i][j] * 2;
                    idx += 1;
                } else {
                    idx += 1;
                    tilted[idx] = board[i][j];
                }
            }

            for (let j = 0; j < n; j++) {
                board[i][j] = tilted[j];
            }
        }

        return board;
    }

});
/**
 4
 2 2 4 4
 0 0 0 0
 0 0 0 0
 0 0 0 0
 **/
