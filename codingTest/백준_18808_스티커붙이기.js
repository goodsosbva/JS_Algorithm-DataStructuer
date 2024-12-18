const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    const [m, n, k] = input[0].split(" ").map(Number);
    const bigMap = Array.from({ length: m }, () => Array(n).fill(0));

    let index = 1;
    for (let i = 0; i < k; i++) {
        let [row, col] = input[index++].split(" ").map(Number);
        let stikers = [];

        for (let j = 0; j < row; j++) {
            stikers.push(input[index++].split(" ").map(Number));
        }

        console.log(stikers);

        let isAttach = false;
        for (let rot = 0; rot < 4; rot++) {
            if (isAttach) break;
            for (let x = 0; x <= m - row; x++) {
                for (let y = 0; y <= n - col; y++) {
                    console.log(x, y);
                    if (chkAttach(x, y, row, col, bigMap, stikers)) {
                        isAttach = true;
                        break;
                    }
                }
                if (isAttach) break;
            }

            if (!isAttach) {
                stikers = rotate(stikers, row, col);
                [row, col] = [col, row];
            }
        }

    }

    let answer = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (bigMap[i][j] === 1) {
                answer += 1;
            }
        }
    }

    console.log(answer);


    function chkAttach(x, y, r, c, bigMap, sticker) {
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (bigMap[x + i][y + j] === 1 && sticker[i][j] === 1) {
                    return false;
                }
            }
        }

        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (sticker[i][j] === 1) {
                    bigMap[x + i][y + j] = 1;
                }
            }
        }

        return true;
    }

    function rotate(sticker, r, c) {
        const tmp = Array.from({ length: c }, () => Array(r).fill(0));

        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                tmp[j][r - 1 - i] = sticker[i][j];
            }
        }

        return tmp;
    }

});
