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
  const [n, m, k] = next().split(" ").map(Number);

  const maps = [];
  for (let i = 0; i < n; i++) {
    const map = next().split(" ").map(Number);
    maps.push(map);
  }

  const answer = solution(n, m, k, maps);
  console.log(answer);
  process.exit(0);
});

function bfs(x, y, maps) {
  const q = [[x, y]];
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const cur_num = maps[x][y];
  const visited = Array.from({ length: maps.length }, () =>
    Array(maps[0].length).fill(0),
  );
  visited[x][y] = 1;
  let cnt = 1;

  while (q.length > 0) {
    const [cx, cy] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx >= 0 && nx < maps.length && ny >= 0 && ny < maps[0].length) {
        if (maps[nx][ny] === cur_num && visited[nx][ny] !== 1) {
          q.push([nx, ny]);
          visited[nx][ny] = 1;
          cnt += 1;
        }
      }
    }
  }

  return cnt;
}

function solution(n, m, k, maps) {
  let answer = 0;
  let dice = {
    top: 1,
    bottom: 6,
    east: 3,
    west: 4,
    north: 2,
    south: 5,
  };
  // 상우하좌
  let dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let cur_dir = 1;

  function rollEast(dice) {
    const prev = { ...dice };

    dice.top = prev.west;
    dice.bottom = prev.east;
    dice.east = prev.top;
    dice.west = prev.bottom;
    dice.north = prev.north;
    dice.south = prev.south;

    return dice;
  }

  function rollWest(dice) {
    const prev = { ...dice };

    dice.top = prev.east;
    dice.bottom = prev.west;
    dice.east = prev.bottom;
    dice.west = prev.top;
    dice.north = prev.north;
    dice.south = prev.south;

    return dice;
  }

  function rollNorth(dice) {
    const prev = { ...dice };
    dice.top = prev.south;
    dice.bottom = prev.north;
    dice.north = prev.top;
    dice.south = prev.bottom;
    dice.east = prev.east;
    dice.west = prev.west;
  }

  function rollSouth(dice) {
    const prev = { ...dice };
    dice.top = prev.north;
    dice.bottom = prev.south;
    dice.north = prev.bottom;
    dice.south = prev.top;
    dice.east = prev.east;
    dice.west = prev.west;
  }

  let cur_cord = [0, 0];
  for (let i = 0; i < k; i++) {
    let nx = cur_cord[0] + dir[cur_dir][0];
    let ny = cur_cord[1] + dir[cur_dir][1];

    // 1. 주사위가 이동 방향으로 한 칸 굴러간다.
    if (0 > nx || nx >= n || 0 > ny || ny >= m) {
      cur_dir = (cur_dir + 2) % 4;
      nx = cur_cord[0] + dir[cur_dir][0];
      ny = cur_cord[1] + dir[cur_dir][1];
    }

    // 1-2. 만약, 이동 방향에 칸이 없다면, 이동 방향을 반대로 한 다음 한 칸 굴러간다.
    if (cur_dir === 0) rollNorth(dice);
    else if (cur_dir === 1) rollEast(dice);
    else if (cur_dir === 2) rollSouth(dice);
    else if (cur_dir === 3) rollWest(dice);

    // 2. 주사위가 도착한 칸 (x, y)에 대한 점수를 획득한다.
    const cur_num = maps[nx][ny];
    const count = bfs(nx, ny, maps);
    answer += cur_num * count;

    // 3. 주사위의 아랫면에 있는 정수 A와 주사위가 있는 칸 (x, y)에 있는 정수 B를 비교해 이동 방향을 결정한다.
    const dice_bottom = dice.bottom;
    if (dice_bottom > cur_num) {
      cur_dir = (cur_dir + 1) % 4;
    } else if (dice_bottom < cur_num) {
      cur_dir = (cur_dir + 3) % 4;
    }

    cur_cord = [nx, ny];
  }

  return answer;
}
