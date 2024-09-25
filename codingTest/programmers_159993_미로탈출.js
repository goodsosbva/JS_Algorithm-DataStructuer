class queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.rear === this.front;
  }
}

function isValid(x, y, n, m, maps) {
  if (0 <= x && x < n && 0 <= y && y < m && maps[x][y] !== "X") return true;
  else return false;
}

function solution(maps) {
  var answer = 0;

  const n = maps.length;
  const m = maps[0].length;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const q = new queue();

  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  );

  let endx = -1;
  let endy = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === "S") {
        q.push([i, j, 0, 0]);
        visited[i][j][0] = true;
      }
      if (maps[i][j] === "E") {
        endx = i;
        endy = j;
      }
    }
  }

  while (!q.isEmpty()) {
    let [x, y, lever, cnt] = q.pop();

    if (endx === x && endy === y && lever === 1) {
      return cnt;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (isValid(nx, ny, n, m, maps) && visited[nx][ny][lever] === false) {
        if (maps[nx][ny] === "L") {
          q.push([nx, ny, 1, cnt + 1]);
          visited[nx][ny][lever] = true;
        } else {
          q.push([nx, ny, lever, cnt + 1]);
          visited[nx][ny][lever] = true;
        }
      }
    }
  }

  return -1;
}
