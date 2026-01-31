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
    const k = Number(next());
  
    const apples = [];
    for (let i = 0; i < k; i++) {
      const [x, y] = next().split(" ").map(Number);
      apples.push([x, y]);
    }
  
    const L = Number(next());
    const commands = [];
    for (let i = 0; i < L; i++) {
      const [time, direction] = next().split(" ");
      commands.push([Number(time), direction]);
    }
  
    const result = solution(n, apples, commands);
    console.log(result);
    process.exit(0);
});

function checkCollision(snake, nx, ny) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] === nx && snake[i][1] === ny) return true;
    }
    return false;
}

function changeDirection(prevDirection, direction) {
    if (prevDirection === "Right") {
        if (direction === "D") return "Down";
        else return "Up";
    } else if (prevDirection === "Left") {
        if (direction === "D") return "Up";
        else return "Down";
    } else if (prevDirection === "Up") {
        if (direction === "D") return "Right";
        else return "Left";
    } else if (prevDirection === "Down") {
        if (direction === "D") return "Left";
        else return "Right";
    }
}

function solution(n, apples, commands) {
  let answer = 0;
  const snake = [[0, 0]];
  const dirs = {
    "Right": [0, 1],
    "Left": [0, -1],
    "Up": [-1, 0],
    "Down": [1, 0]
  }
  let startDirection = "Right";
  let curTime = 0;
  for (let i = 0; i < commands.length; i++) {
    const [time, direction] = commands[i];

    for (let j = curTime; j < time; j++) {
        answer += 1;
        const [x, y] = snake[snake.length - 1];
        const nx = x + dirs[startDirection][0];
        const ny = y + dirs[startDirection][1];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) return answer;
        // 뱀이 서로 닿았는지 체크
        if (checkCollision(snake, nx, ny)) return answer;
        snake.push([nx, ny]);

        // 사과가 있는지 체크
        const appleIdx = apples.findIndex(([a, b]) => a === nx + 1 && b === ny + 1);
        if (appleIdx !== -1) {
            apples.splice(appleIdx, 1);
        } else {
            snake.shift();
        }
    }

    curTime = time;
    startDirection = changeDirection(startDirection, direction);
  }

  while (true) {
    answer += 1;
    const [x, y] = snake[snake.length - 1];
    const nx = x + dirs[startDirection][0];
    const ny = y + dirs[startDirection][1];
    
    
    if (nx < 0 || nx >= n || ny < 0 || ny >= n) return answer;
    // 뱀이 서로 닿았는지 체크
    if (checkCollision(snake, nx, ny)) return answer;
    snake.push([nx, ny]);

    // 사과가 있는지 체크
    if (apples.includes([nx + 1, ny + 1])) {
        apples.splice(apples.indexOf([nx, ny]), 1);
    } else {
        snake.shift();
    }
  } 
}


`
6
3
3 4
2 5
5 3
3
3 D
15 L
17 D
`