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
    let idx = 0;
    const next = () => input[idx++]; 
    const n = Number(next());
    const seats = Array.from(Array(n), () => new Array(n).fill(0));
    
    const favorites = [];
    for (let i = 0; i < n * n; i++) {
      const numbers = next().split(" ").map(Number);
      favorites.push([numbers[0], numbers.slice(1)]);
    }
  
   
    const result = solution(seats, favorites);
    console.log(result);
    process.exit(0);
});


function solution(seats, favorites) {
    const n = seats.length;

    // 주변 4방향 체크
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    const dics = {};
    
    for (let i = 0; i < favorites.length; i++) {
        const [number, favorite] = favorites[i];
        dics[number] = favorite;
        
        let copy = Array.from(Array(n), () => new Array(n).fill(0));
        for (let j = 0; j < favorite.length; j++) {
            const favoriteNumber = favorite[j];
            
            for (let k = 0; k < n; k++) {
                for (let l = 0; l < n; l++) {
                    if (seats[k][l] === favoriteNumber) {
                    
                        for (let d = 0; d < 4; d++) {
                            const nr = k + dr[d];
                            const nc = l + dc[d];
                            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                                copy[nr][nc] += 1;   
                            }
                        }
                    }
                }
            }
        }

          // 1. 조건 확인
          let max = -1;
          for (let a = 0; a < n; a++) {
              for (let b = 0; b < n; b++) {
                  if (copy[a][b] > max && seats[a][b] === 0) {
                      max = copy[a][b];
                  }
              }
          }

          let maxs = [];
          for (let a = 0; a < n; a++) {
              for (let b = 0; b < n; b++) {
                  if (copy[a][b] === max && seats[a][b] === 0) {
                      maxs.push([a, b]);
                  }
              }
          }

          if (maxs.length === 1) {
              seats[maxs[0][0]][maxs[0][1]] = number;
              continue;
          }

          // 2. 조건 확인 - 빈칸
          let maxEmpty = 0;
          let maxEmptyPos = [];
          for (let a = 0; a < maxs.length; a++) {
            const [x, y] = maxs[a];
            let empty = 0;
            for (let d = 0; d < 4; d++) {
                const nx = x + dr[d];
                const ny = y + dc[d];

                if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
                    if (seats[nx][ny] === 0) {
                        empty++;
                    }
                }
            }

            if (empty > maxEmpty) {
                maxEmpty = empty;
                maxEmptyPos = [[x, y]]; 
            } else if (empty === maxEmpty) {
                maxEmptyPos.push([x, y]);
            }
          }

        const [finalX, finalY] = maxEmptyPos[0];
        seats[finalX][finalY] = number;
    }

    let answer = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let cnt = 0;
            if (seats[i][j] !== 0) {
                for (let d = 0; d < 4; d++) {
                    const nx = i + dr[d];
                    const ny = j + dc[d];
    
                    if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
                        if (seats[nx][ny] !== 0) {
                            dics[seats[i][j]].includes(seats[nx][ny]) ? cnt += 1 : cnt += 0;
                        }
                    }
                }
            }
            let scores = [0, 1, 10, 100, 1000];
            answer += scores[cnt];
        }
    }
    return answer;
}


