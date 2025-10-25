function solution(L, R, C, building, st) {
  const dl = [0, 0, 0, 0, 1, -1]
  const dr = [0 ,1, -1, 0, 0, 0]
  const dc = [1, 0, 0, -1, 0, 0]


  const move = [[...st, 0]];
  const visited = Array.from({ length: L }, () => Array(R).fill().map(() => Array(C).fill(false)));
  visited[st[0]][st[1]][st[2]] = true; 

  while (move.length) {
    const [l, r, c, dis] = move.shift();

    for (let i = 0; i < 6; i++) {
      const nl = l + dl[i];
      const nr = r + dr[i];
      const nc = c + dc[i];
        
      if (nl < 0 || nl >= L || nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (visited[nl][nr][nc]) continue; 
      if (building[nl][nr][nc] === '#') continue;

      if (building[nl][nr][nc] === 'E') return 'Escaped in ' + (dis + 1) + ' minute(s).';
      visited[nl][nr][nc] = true;
      move.push([nl, nr, nc, dis + 1]);
    }
  }
    
  return "Trapped!";
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
  if (line === "0 0 0") rl.close();
});

rl.on("close", () => {
  let idx = 0;

  while (true) {
    const [L, R, C] = input[idx++].split(" ").map(Number);
    if (L === 0 && R === 0 && C === 0) break;

    const building = [];
    let startPos = null; 

    for (let l = 0; l < L; l++) {
      const floor = [];
      for (let r = 0; r < R; r++) {
        const row = input[idx++].split("");
        floor.push(row);
        
        for (let c = 0; c < C; c++) {
          if (row[c] === 'S') {
            startPos = [ l, r, c ];
          } 
        }
        
      }
      building.push(floor);
      
     if (l < L - 1 && idx < input.length && input[idx] === "") {
        idx++;
      }
    }

    console.log(solution(L, R, C, building, startPos));

     while (idx < input.length && input[idx] === "") {
      idx++;
    }

    }
});