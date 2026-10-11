
function search(board, moves, id) {
    let cords = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === id) cords.push([i, j]);
        }
    }

    return cords;
}

function solution(board, commands) {
    const n = board.length;
    const m = board[0].length;

    const directions = {
        1: [0, 1],   // 오른쪽
        2: [1, 0],   // 아래
        3: [0, -1],  // 왼쪽
        4: [-1, 0]   // 위
    };

    for (let i = 0; i < commands.length; i++) {
        const [id, arrow] = commands[i];
        const [dx, dy] = directions[arrow];

        let moves = [[id, arrow]];
        let visited = new Set([id]);

        // 이동할 앱이 남아 있는 동안 반복
        while (moves.length > 0) {

            // 1. 연쇄 충돌하는 앱 모두 탐색
            while (moves.length > 0) {
                const [currentId, currentArrow] = moves.pop();

                const cords = search(board, moves, currentId);

                for (const [x, y] of cords) {
                    const nx = (x + dx + n) % n;
                    const ny = (y + dy + m) % m;

                    const otherId = board[nx][ny];

                    if (otherId !== 0 && !visited.has(otherId)) {
                        visited.add(otherId);
                        moves.push([otherId, currentArrow]);
                    }
                }
            }

            // 2. 이동 대상 앱들을 동시에 한 칸 이동
            const tmp_board = Array.from(
                { length: n },
                () => Array(m).fill(0)
            );

            for (let x = 0; x < n; x++) {
                for (let y = 0; y < m; y++) {
                    const currentId = board[x][y];

                    if (currentId === 0) continue;

                    if (visited.has(currentId)) {
                        const nx = (x + dx + n) % n;
                        const ny = (y + dy + m) % m;

                        tmp_board[nx][ny] = currentId;
                    } else {
                        tmp_board[x][y] = currentId;
                    }
                }
            }

            // 3. 최신 board 갱신
            board = tmp_board;

            // 4. 다음 이동을 위한 초기화
            moves = [];
            visited = new Set();

            // 5. 격자 경계를 넘어 분리된 앱 확인
            if (dy !== 0) {
                // 좌우 이동
                for (let x = 0; x < n; x++) {
                    const currentId = board[x][0];

                    if (
                        currentId === 0 ||
                        currentId !== board[x][m - 1]
                    ) continue;

                    let isSplit = false;

                    for (let y = 1; y < m - 1; y++) {
                        if (board[x][y] !== currentId) {
                            isSplit = true;
                            break;
                        }
                    }

                    if (isSplit && !visited.has(currentId)) {
                        visited.add(currentId);
                        moves.push([currentId, arrow]);
                    }
                }
            } else {
                // 상하 이동
                for (let y = 0; y < m; y++) {
                    const currentId = board[0][y];

                    if (
                        currentId === 0 ||
                        currentId !== board[n - 1][y]
                    ) continue;

                    let isSplit = false;

                    for (let x = 1; x < n - 1; x++) {
                        if (board[x][y] !== currentId) {
                            isSplit = true;
                            break;
                        }
                    }

                    if (isSplit && !visited.has(currentId)) {
                        visited.add(currentId);
                        moves.push([currentId, arrow]);
                    }
                }
            }
        }
    }

    return board;
}
