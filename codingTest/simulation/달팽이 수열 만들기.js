function solution(n) {
    const snailArr = Array.from({ length: n }, () => Array(n).fill(0));

    let stRow = 0, endRow = n - 1;
    let stCol = 0, endCol = n - 1;

    let num = 1;

    while (stRow <= endRow && stCol <= endCol) {
        for (let i = stCol; i <= endCol; i++) {
            snailArr[stRow][i] = num;
            num += 1;
        }

        stRow += 1;

        for (let i = stRow; i <= endRow; i++) {
            snailArr[i][endCol] = num;
            num += 1;
        }

        endCol -= 1;

        if (stRow <= endRow) {
            for (let i = endCol; i >= stCol; i--) {
                snailArr[endRow][i] = num;
                num += 1;
            }
            endRow -= 1;
        }

        if (stCol <= endCol) {
            for (let i = endRow; i >= stRow; i--) {
                snailArr[i][stCol] = num;
                num += 1;
            }
            stCol += 1;
        }
    }

    return snailArr;
}

console.log(solution(4));